
import puppeteer from "puppeteer";

export const infojobsAdapter = async (typeEngineering:string) =>{
    const dataCollection: any[] = [];

    // TODO: Construir a conversao de dados 
    const searchUrl = `https://www.infojobs.com.br/empregos.aspx?palabra=${encodeURIComponent(typeEngineering)}`;
    const baseUrl = "https://www.infojobs.com.br";

    const browser = await puppeteer.launch({ headless: true });     
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
    
    const vagas = await page.$$eval("div.card.js_rowCard", (cards, baseUrl) => {
        return cards.map((card) => {
            const container = card.querySelector(".js_cardLink");

            const title = container?.querySelector("h2")?.textContent?.trim() || "";
            const company = container?.querySelector("a.text-body.text-decoration-none")?.textContent?.trim() || "";
            const location = container?.querySelector(".small.text-medium.mr-24")?.textContent?.trim() || "";
            const description = container?.querySelectorAll(".small.text-medium")?.[1]?.textContent?.trim() || "";
            const relativeLink = container?.getAttribute("data-href") || "";

            return {
                title,
                description,
                typeEngineering: "Engenharia Mecanica",
                typeJob: "job", // ou "ESTAGIO", conforme o contexto
                jobLocation: location,
                requirements: "A verificar",
                benefits: "A verificar",
                responsabilities: "A verificar",
                link: baseUrl + relativeLink
            };
        });
  }, baseUrl);

  dataCollection.push(...vagas);

  await browser.close();
  return dataCollection;
};