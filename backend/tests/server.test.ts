// tests/server.test.ts
import { jest } from "@jest/globals";
import { SpiedFunction } from "jest-mock";

describe("Server", () => {
    let listenMock: jest.Mock;
    let consoleSpy: SpiedFunction<(...args: any[]) => void>;

    beforeEach(() => {
        jest.resetModules(); // limpa cache de módulos para aplicar mocks
        listenMock = jest.fn();
        consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleSpy.mockRestore();
    });

    it("Deve iniciar o servidor quando o banco conecta", async () => {
        const connectDatabaseMock = jest.fn(async () => { });

        jest.doMock("../src/config/database", () => ({
            connectDatabase: connectDatabaseMock,
        }));

        jest.doMock("../src/app", () => ({
            __esModule: true,
            default: () => ({ listen: listenMock }),
        }));

        // Importa após os mocks
        await import("../src/server");

        expect(connectDatabaseMock).toHaveBeenCalled();
        expect(listenMock).toHaveBeenCalled();
    });

    it("Deve logar erro se o banco falhar", async () => {
        const connectDatabaseMock = jest.fn(async () => {
            throw new Error("DB error");
        });

        jest.doMock("../src/config/database", () => ({
            connectDatabase: connectDatabaseMock,
        }));

        jest.doMock("../src/app", () => ({
            __esModule: true,
            default: () => ({ listen: listenMock }),
        }));

        await import("../src/server");
        await new Promise(process.nextTick); // <-- espera o catch do server ser chamado

        expect(connectDatabaseMock).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Falha ao conectar ao banco de dados"),
            expect.any(Error)
        );
    });
});

