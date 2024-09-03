# Laravel Blade File Copier

## Overview

**Laravel Blade File Copier** is a VS Code extension designed to streamline the process of copying Laravel Blade files to brand-specific folders within a multi-brand setup. This extension automatically creates the necessary directories and copies the currently open Blade file to the appropriate location within your brand folders, reducing manual work and minimizing errors.

## Features

- **Dynamic Brand Selection:** Automatically detects available brands by reading the directories in the `resources/themes` folder.
- **Customizable Themes Folder:** Configure the path to your themes folder via the extension settings.
- **Automatic Directory Creation:** Automatically creates any missing directories in the target brand folder structure.
- **User-Friendly Interface:** Easily copy files with just a few clicks using the command palette.

## Installation

1. Open VS Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `Laravel Blade File Copier`.
4. Click `Install`.

## Usage

1. Open a Blade file (`.blade.php`) in your editor.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Type `Copy Blade File to Theme` and select the command.
4. Choose the desired brand from the list of available brands.
5. The file will be copied to the appropriate location within the selected brand's folder.

## Configuration

You can configure the path to your themes folder by modifying the extension settings.

1. Go to `File > Preferences > Settings` (or `Code > Preferences > Settings` on macOS).
2. Search for `Laravel Blade File Copier`.
3. Update the **Themes Folder** setting to match your project's structure. The default value is `resources/themes`.

### Example Configuration

If your themes folder is located in a different directory, for example, `custom/themes`, you can change the setting like this:

```json
{
    "yourExtension.themesFolder": "custom/themes"
}
```
### Extension Settings

This extension contributes the following settings:

- yourExtension.themesFolder: Specifies the relative path to the themes folder where brand-specific folders are located. The default is resources/themes.

### Known Issues

- The extension currently assumes that your Laravel project is structured in a certain way. If your structure varies significantly, the extension may not work as expected.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/Andreas-Halemba/IU-Blade-Theme-Helper-VS-Code-Plugin).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.