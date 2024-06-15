const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

let panelButton;
let panelButtonText;
let timeout = null;

// look for quotes in `~/.config/quotes/gnome_quotes.txt`
const filepath = GLib.build_filenamev([GLib.get_home_dir(), ".config", "quotes", "gnome_quotes.txt"]);
let quotes = GLib.file_get_contents(filepath)[1].toString().split("\n");

function init() {
    panelButton = new St.Bin({
        style_class: "panel-button",
    });
    panelButtonText = new St.Label({
        text: "hello world",
        y_align: Clutter.ActorAlign.CENTER,
    });
    panelButton.set_child(panelButtonText);
}

function update_text(new_text) {
    // reassign text element to a Label with the new text, then reassign it to panelButton
    panelButtonText = new St.Label({
        text: new_text,
        y_align: Clutter.ActorAlign.CENTER,
    });
    panelButton.set_child(panelButtonText);
}

function enable() {
    // Add button to the panel
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);

    // Math.random() by itself actually yields the same values each run; fix this using current time
    randidx = (Math.floor(Math.random() * quotes.length) + Date.now()) % quotes.length;
    update_text(quotes[randidx])
    timeout = GLib.timeout_add(GLib.PRIORITY_DEFAULT, (600 * 1000), () => {
        randidx = Math.floor(Math.random() * quotes.length);
        update_text(quotes[randidx])
        return GLib.SOURCE_CONTINUE;
    });
}

function disable() {
    // Remove the added button from panel
    Main.panel._rightBox.remove_child(panelButton);
    if (timeout) {
        GLib.Source.remove(timeout);
        timeout = null;
    }
}