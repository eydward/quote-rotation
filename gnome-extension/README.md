# quote display

A personal GNOME shell extension that rotates quotes in the title bar every 10 minutes.

To get this working:
1. Make sure you have the `gnome-extensions` CLI installed, e.g. by `sudo apt install gnome-extensions`.
2. Use `gnome-extensions create` to interactively setup a new extension; name it according to `metadata.json`. The actual extension name/description details don't really matter. But to enable/disable from command line, you identify the extension by UUID.
3. The previous step should create a folder for the custom local extension in `~/.local/share/gnome-shell/extensions/` (which is also where your other downloaded gnome extensions live). Now `cd` into the folder and replace `extension.js` with the file here.
4. Create a text file at `~/.config/quotes/gnome_quotes.txt` containing some quotes. The textfile will be parsed as one quote per (new)line.

Note - it is tempting to just directly move the files here into a folder in the extensions directory. If you do this, GNOME does not actually register it as a new extension and nothing will happen.

The `quote.sh` shellscript refreshes (and reenables) the extension.

## todo

- make it possible to change the time interval via some config file (important), or on a GNOME shell menu as part of the extension (unimportant)
- same thing for custom fonts