const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "iuBladeThemeHelper.copyBladeToTheme",
    function () {
      const currentFile = vscode.window.activeTextEditor.document.fileName;

      if (!currentFile.endsWith(".blade.php")) {
        vscode.window.showErrorMessage("Not a Blade file.");
        return;
      }

      // Retrieve the custom themes folder setting
      const config = vscode.workspace.getConfiguration("iuBladeThemeHelper");
      const themesFolder = config.get("themesFolder", "resources/themes");

      // Define the themes directory based on the setting
      const themesDir = path.join(vscode.workspace.rootPath, themesFolder);

      // Check if themes directory exists
      if (!fs.existsSync(themesDir)) {
        vscode.window.showErrorMessage("Themes directory does not exist.");
        return;
      }

      if (currentFile.startsWith(themesDir)) {
        vscode.window.showWarningMessage(
          "The current file is already located in a themes folder."
        );
        return;
      }

      // Read the available brands (directories) in the themes folder
      const brands = fs.readdirSync(themesDir).filter((file) => {
        return fs.statSync(path.join(themesDir, file)).isDirectory();
      });

      if (brands.length === 0) {
        vscode.window.showErrorMessage("No brand directories found in themes.");
        return;
      }

      // Prompt the user to select a brand
      vscode.window
        .showQuickPick(brands, {
          placeHolder: "Select a brand",
        })
        .then((brand) => {
          if (!brand) return;

          // Generate the destination path
          const relativePath = path.relative(
            vscode.workspace.rootPath + "/resources",
            currentFile
          );
          const targetPath = path.join(themesDir, brand, relativePath);

          // Check if the file already exists in the target directory
          if (fs.existsSync(targetPath)) {
            vscode.window.showWarningMessage(
              `File already exists in the target directory: ${targetPath}`
            );
            return; // Exit the function without copying the file
          }

          // Ensure directories exist
          const targetDir = path.dirname(targetPath);
          fs.mkdirSync(targetDir, { recursive: true });

          // Copy the file
          fs.copyFileSync(currentFile, targetPath);

          vscode.window.showInformationMessage(`Copied to ${targetPath}`);

          // Open the copied file
          vscode.workspace.openTextDocument(targetPath).then((doc) => {
            vscode.window.showTextDocument(doc);
          });
        });
    }
  );

  context.subscriptions.push(disposable);

  // Update context key when the active editor changes
  vscode.window.onDidChangeActiveTextEditor(updateContextKey);

  function updateContextKey(editor) {
    if (!editor) {
      return;
    }

    const currentFile = editor.document.fileName;
    const config = vscode.workspace.getConfiguration("iuBladeThemeHelper");
    const themesFolder = config.get("themesFolder", "resources/themes");
    const themesDir = path.join(vscode.workspace.rootPath, themesFolder);

    const isInThemesDir = currentFile.startsWith(themesDir);
    vscode.commands.executeCommand(
      "setContext",
      "iuBladeThemeHelper.isInThemesDir",
      isInThemesDir
    );
  }

  // Initialize the context key for the currently active editor
  updateContextKey(vscode.window.activeTextEditor);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
