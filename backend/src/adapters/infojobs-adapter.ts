import puppeteer, { Browser, Page } from "puppeteer";
import { TypeJob } from "../domain/enums/typeJob";
import { Opportunity } from "../models/opportunity-model";
import { mapToFieldEngineering } from "../mappers/fieldEngineerMapper";

// definição da função sleep
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


// busca o registro de vaga da página detalhada
const searchOpportunity = async (typeEngineering: string, fullLink: string, vagaPage: Page): Promise<Opportunity | undefined> => {

  try {
    await vagaPage.goto(fullLink, { waitUntil: "domcontentloaded", timeout: 60000 });
    const title = await vagaPage.$eval("h2.js_vacancyHeaderTitle", el => el.textContent?.trim() || "");
    const jobLocation = await vagaPage.$eval(".text-medium.mb-4", el => el.textContent?.replace(/,?\s*km de você\./, '').trim() || "");

    const descriptionParagraph = await vagaPage.$eval(
      ".js_vacancyDataPanels p:nth-of-type(1)",
      el => el.textContent?.trim() || ""
    );

    // Benefícios e Responsabilidades (extraídos do mesmo parágrafo)
    const benefitsMatch = descriptionParagraph.match(/Benefícios:([\s\S]+)/);
    const benefits = benefitsMatch ? benefitsMatch[1].trim() : "A verificar";
    const responsabilities = benefitsMatch ? descriptionParagraph.split("Benefícios:")[0].trim() : descriptionParagraph;

    // Requisitos
    const requirements = await vagaPage.$$eval(".js_vacancyDataPanels .h4", (headers) => {
      const exigenciasIndex = headers.findIndex(h => h.textContent?.includes("Exigências"));
      if (exigenciasIndex !== -1) {
        const list = headers[exigenciasIndex].nextElementSibling;
        return list?.textContent?.trim() || "A verificar";
      }
      return "A verificar";
    });

    const tipoContrato = await vagaPage.$$eval("p", ps => {
      const p = ps.find(p => p.textContent?.includes("Tipo de contrato e Jornada:"));
      if (!p) return "A verificar";
      const label = p.querySelector("span")?.textContent || "";
      return p.textContent?.replace(label, "").trim() || "A verificar";
    });

    const inferredTypeJob = tipoContrato.toLowerCase().includes("efetivo") ? TypeJob.JOB : TypeJob.TRAINEE;

    const vaga = {
      title,
      description: responsabilities,
      typeEngineering: mapToFieldEngineering(typeEngineering),
      typeJob: inferredTypeJob,
      jobLocation,
      requirements,
      benefits,
      responsabilities,
      data: new Date(),
      link: fullLink
    }

    return vaga;

  } catch (error) {
    console.error(`❌ Erro ao processar a vaga ${fullLink}:`, error);
    return undefined;
  }
  /*     finally{
          await vagaPage.close();  
      }
   */
}

// Busca a lista de vagas para o tipo de engenharia solicitada inicialmente
export const infojobsAdapter = async (typeEngineering: string): Promise<Opportunity[]> => {
  const dataCollection: Opportunity[] = [];

  const contrato: string = "2,4";   // estabelece tipo de contrato: 2 - "Efetivo - CLT" e 4 - "Estágio"
  const estadoBrasil: string = "";     // restringe a pesquisa ao estado brasileiro do "Espírito Santo (172), Rio de Janeiro(182), São Paulo(64)"
  const searchUrl = `https://www.infojobs.com.br/empregos.aspx?palabra=${encodeURIComponent(typeEngineering)}&provincia=${estadoBrasil}&tipocontrato=${contrato}`;
  const baseUrl = "https://www.infojobs.com.br";
  let browser: Browser|undefined;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-features=MediaStream',
        '--use-fake-ui-for-media-stream',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const context = await browser.createBrowserContext(); // cria uma navegação anômina e sem cookies
    const page = await context.newPage();

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'mediaDevices', {
        value: undefined, // Remove a API completamente
      });
    });

    await page.setCacheEnabled(false);
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

    console.log(`😊 Página principal: ${searchUrl} `);

    // Captura os links das vagas da lista principal
    const links = await page.$$eval("div.card.js_rowCard .js_cardLink", cards =>
      cards
        .map(card => card.getAttribute("data-href"))
        .filter(href => !!href) as string[]
    );

    await page.close();
    
    // Constrói um conjunto (set) de links (para evitar repetição)
    const processedLinks: Set<string> = new Set<string>();
    for (const relativeLink of links) processedLinks.add(baseUrl + relativeLink);
      
    

    // Para cada link de vaga individual

    for (const fullLink of processedLinks) {
      const vagaPage = await context.newPage();
      console.log(`😊 Página detalhada: ${fullLink} `);
      try {
        const oneOpportunity: Opportunity | undefined = await searchOpportunity(typeEngineering, fullLink, vagaPage);
        if (oneOpportunity) dataCollection.push(oneOpportunity);
      } catch (err) {
        // ✅ Pausa entre uma vaga e outra
        console.error("Erro ao processar vaga:", fullLink, err);
      } finally {
        await vagaPage.close();
        await sleep(500);
      }

    }
  } catch (err) {
    console.error("Erro ao acessar o navegador:", err);
  } finally {
    if(browser) await browser.close();
  }
  return dataCollection;
};