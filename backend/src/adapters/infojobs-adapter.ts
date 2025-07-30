import puppeteer, { Browser } from "puppeteer";
import { FieldEngineering } from "../domain/enums/fieldEngineering";
import { TypeJob } from "../domain/enums/typeJob";
import { Opportunity } from "../models/opportunity-model";


// busca o registro de vaga da página detalhada
const searchOpportunity = async (typeEngineering: string, fullLink:string, browser:Browser):Promise<Opportunity|undefined> => {
    const vagaPage = await browser.newPage();

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

      const inferredTypeJob = title.toLowerCase().includes("estágio") ? TypeJob.TRAINEE : TypeJob.JOB;

      return {
        title,
        description: responsabilities,
        typeEngineering: typeEngineering as FieldEngineering,
        typeJob: inferredTypeJob,
        jobLocation,
        requirements,
        benefits,
        responsabilities,
        data: new Date(), //.toLocaleDateString(),
        link: fullLink
      };

    } catch (error) {
        console.error(`❌ Erro ao processar a vaga ${fullLink}:`, error);
        return undefined;
    } finally{
        await vagaPage.close();  
    }
     
}

// Busca a lista de vagas para o tipo de engenharia solicitada inicialmente
export const infojobsAdapter = async (typeEngineering: string): Promise<Opportunity[]> => {
  const dataCollection: Opportunity[] = [];

  const searchUrl = `https://www.infojobs.com.br/empregos.aspx?palabra=${encodeURIComponent(typeEngineering)}`;
  const baseUrl = "https://www.infojobs.com.br";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  console.log(`😊 Página principal: ${searchUrl} `);

  // Captura os links das vagas da lista principal
  const links = await page.$$eval("div.card.js_rowCard .js_cardLink", cards =>
    cards
      .map(card => card.getAttribute("data-href"))
      .filter(href => !!href) as string[]
  );

  // Para cada link de vaga individual
  for (const relativeLink of links) {
    const fullLink = baseUrl + relativeLink;
    console.log(`😊 Página detalhada: ${fullLink} `);
    let oneOpportunity:Opportunity|undefined = await searchOpportunity(typeEngineering,fullLink,browser);
    if (oneOpportunity) dataCollection.push(oneOpportunity);
  }

  await browser.close();
  return dataCollection;
};