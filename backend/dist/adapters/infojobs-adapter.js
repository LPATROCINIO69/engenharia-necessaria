"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infojobsAdapter = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const typeJob_1 = require("../domain/enums/typeJob");
const fieldEngineerMapper_1 = require("../mappers/fieldEngineerMapper");
// definição da função sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// busca o registro de vaga da página detalhada
const searchOpportunity = (typeEngineering, fullLink, vagaPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield vagaPage.goto(fullLink, { waitUntil: "domcontentloaded", timeout: 60000 });
        const title = yield vagaPage.$eval("h2.js_vacancyHeaderTitle", el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
        const jobLocation = yield vagaPage.$eval(".text-medium.mb-4", el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.replace(/,?\s*km de você\./, '').trim()) || ""; });
        const descriptionParagraph = yield vagaPage.$eval(".js_vacancyDataPanels p:nth-of-type(1)", el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
        // Benefícios e Responsabilidades (extraídos do mesmo parágrafo)
        const benefitsMatch = descriptionParagraph.match(/Benefícios:([\s\S]+)/);
        const benefits = benefitsMatch ? benefitsMatch[1].trim() : "A verificar";
        const responsabilities = benefitsMatch ? descriptionParagraph.split("Benefícios:")[0].trim() : descriptionParagraph;
        // Requisitos
        const requirements = yield vagaPage.$$eval(".js_vacancyDataPanels .h4", (headers) => {
            var _a;
            const exigenciasIndex = headers.findIndex(h => { var _a; return (_a = h.textContent) === null || _a === void 0 ? void 0 : _a.includes("Exigências"); });
            if (exigenciasIndex !== -1) {
                const list = headers[exigenciasIndex].nextElementSibling;
                return ((_a = list === null || list === void 0 ? void 0 : list.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "A verificar";
            }
            return "A verificar";
        });
        const tipoContrato = yield vagaPage.$$eval("p", ps => {
            var _a, _b;
            const p = ps.find(p => { var _a; return (_a = p.textContent) === null || _a === void 0 ? void 0 : _a.includes("Tipo de contrato e Jornada:"); });
            if (!p)
                return "A verificar";
            const label = ((_a = p.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent) || "";
            return ((_b = p.textContent) === null || _b === void 0 ? void 0 : _b.replace(label, "").trim()) || "A verificar";
        });
        const inferredTypeJob = tipoContrato.toLowerCase().includes("efetivo") ? typeJob_1.TypeJob.JOB : typeJob_1.TypeJob.TRAINEE;
        const vaga = {
            title,
            description: responsabilities,
            typeEngineering: (0, fieldEngineerMapper_1.mapToFieldEngineering)(typeEngineering),
            typeJob: inferredTypeJob,
            jobLocation,
            requirements,
            benefits,
            responsabilities,
            data: new Date(),
            link: fullLink
        };
        return vaga;
    }
    catch (error) {
        console.error(`❌ Erro ao processar a vaga ${fullLink}:`, error);
        return undefined;
    }
    /*     finally{
            await vagaPage.close();
        }
     */
});
// Busca a lista de vagas para o tipo de engenharia solicitada inicialmente
const infojobsAdapter = (typeEngineering) => __awaiter(void 0, void 0, void 0, function* () {
    const dataCollection = [];
    const contrato = "2,4"; // estabelece tipo de contrato: 2 - "Efetivo - CLT" e 4 - "Estágio"
    const estadoBrasil = ""; // restringe a pesquisa ao estado brasileiro do "Espírito Santo (172), Rio de Janeiro(182), São Paulo(64)"
    const searchUrl = `https://www.infojobs.com.br/empregos.aspx?palabra=${encodeURIComponent(typeEngineering)}&provincia=${estadoBrasil}&tipocontrato=${contrato}`;
    const baseUrl = "https://www.infojobs.com.br";
    let browser;
    try {
        browser = yield puppeteer_1.default.launch({
            headless: true,
            args: [
                '--disable-features=MediaStream',
                '--use-fake-ui-for-media-stream',
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const context = yield browser.createBrowserContext(); // cria uma navegação anômina e sem cookies
        const page = yield context.newPage();
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'mediaDevices', {
                value: undefined, // Remove a API completamente
            });
        });
        yield page.setCacheEnabled(false);
        yield page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        yield page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
        console.log(`😊 Página principal: ${searchUrl} `);
        // Captura os links das vagas da lista principal
        const links = yield page.$$eval("div.card.js_rowCard .js_cardLink", cards => cards
            .map(card => card.getAttribute("data-href"))
            .filter(href => !!href));
        yield page.close();
        // Constrói um conjunto (set) de links (para evitar repetição)
        const processedLinks = new Set();
        for (const relativeLink of links)
            processedLinks.add(baseUrl + relativeLink);
        // Para cada link de vaga individual
        for (const fullLink of processedLinks) {
            const vagaPage = yield context.newPage();
            console.log(`😊 Página detalhada: ${fullLink} `);
            try {
                const oneOpportunity = yield searchOpportunity(typeEngineering, fullLink, vagaPage);
                if (oneOpportunity)
                    dataCollection.push(oneOpportunity);
            }
            catch (err) {
                // ✅ Pausa entre uma vaga e outra
                console.error("Erro ao processar vaga:", fullLink, err);
            }
            finally {
                yield vagaPage.close();
                yield sleep(500);
            }
        }
    }
    catch (err) {
        console.error("Erro ao acessar o navegador:", err);
    }
    finally {
        if (browser)
            yield browser.close();
    }
    return dataCollection;
});
exports.infojobsAdapter = infojobsAdapter;
