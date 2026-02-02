require("dotenv").config();
const { handleCommand } = require("./commands");
const { closeInactiveIssues } = require("./closeIssues");

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const ISSUE_NUMBER = process.env.ISSUE_NUMBER; // usado solo para pruebas de comandos
const COMMAND = process.env.COMMAND;           // usado solo para pruebas de comandos

async function main() {
  const mode = process.env.MODE || "all"; // "close", "command" o "all"

  if (mode === "close" || mode === "all") {
    console.log("Cerrando issues inactivos...");
    await closeInactiveIssues(OWNER, REPO, 30);
    console.log("Proceso de cierre de issues finalizado.");
  }

  if (mode === "command" || mode === "all") {
    if (COMMAND && ISSUE_NUMBER) {
      console.log(`Procesando comando: ${COMMAND}`);
      await handleCommand(COMMAND, { owner: OWNER, repo: REPO, issue_number: ISSUE_NUMBER });
      console.log("Comando procesado.");
    } else {
      console.log("No hay comando definido. Saltando paso de comandos.");
    }
  }
}

main().catch(err => {
  console.error("Error en ejecución del bot:", err);
});
