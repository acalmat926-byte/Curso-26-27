const downloadButton = document.getElementById("btnDescargar");
const assignment = document.getElementById("enunciado");

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function createWordDocument() {
  const wordDocument = document.implementation.createHTMLDocument("Actividad 4");
  const charset = wordDocument.createElement("meta");
  charset.setAttribute("charset", "UTF-8");
  wordDocument.head.appendChild(charset);
  wordDocument.body.innerHTML = assignment.innerHTML;

  return "<!doctype html>\n" + wordDocument.documentElement.outerHTML;
}

downloadButton.addEventListener("click", () => {
  const html = createWordDocument();

  try {
    if (typeof htmlDocx !== "undefined") {
      downloadFile(
        htmlDocx.asBlob(html),
        "Actividad_4_Ampliacion_Catalogo_Interactivo.docx"
      );
      return;
    }
  } catch (error) {
    console.error("No se pudo generar el archivo DOCX:", error);
  }

  downloadFile(
    new Blob(["\ufeff", html], { type: "application/msword" }),
    "Actividad_4_Ampliacion_Catalogo_Interactivo.doc"
  );
});
