/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GLib from "gi://GLib";
import GObject from "gi://GObject";
import St from "gi://St";
import Clutter from "gi://Clutter";

import {
  Extension,
  gettext as _,
} from "resource:///org/gnome/shell/extensions/extension.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import * as PopupMenu from "resource:///org/gnome/shell/ui/popupMenu.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

const Indicator = GObject.registerClass(
  class Indicator extends PanelMenu.Button {
    _init() {
      super._init(0.0, _("My Shiny Indicator"));

      this.filepath = GLib.build_filenamev([
        GLib.get_home_dir(),
        ".config",
        "quotes",
        "gnome_quotes.txt",
      ]);
      this.quotes = GLib.file_get_contents(this.filepath)[1]
        .toString()
        .split("\n");

      this.label = new St.Label({
        text: "hello world",
        y_align: Clutter.ActorAlign.CENTER,
      });
      this.add_child(this.label);

      //   let item = new PopupMenu.PopupMenuItem(_("Show Notification"));
      //   item.connect("activate", () => {
      //     Main.notify(_("Whatʼs up, folks?"));
      //   });
      //   this.menu.addMenuItem(item);
    }

    update_text(new_text) {
      // reassign text element to a Label with the new text, then reassign it to panelButton
      this.label.text = new_text;
    }
  }
);

export default class IndicatorExampleExtension extends Extension {
  enable() {
    this._indicator = new Indicator();

    let len = this._indicator.quotes.length;
    // Math.random() by itself actually yields the same values each run; fix this using current time
    let randidx = (Math.floor(Math.random() * len) + Date.now()) % len;
    let t = 600 * 1000;
    let timeout = GLib.timeout_add(GLib.PRIORITY_LOW, t, () => {
      randidx = Math.floor(Math.random() * len);
      this._indicator.update_text(this._indicator.quotes[randidx]);
      return GLib.SOURCE_CONTINUE;
    });

    Main.panel.addToStatusArea(this.uuid, this._indicator);
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}
