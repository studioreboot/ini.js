var INI = {
    /** @param {string} string */
    parse: function (string) {
        var lines = string.split("\n");
        var ini = {}, ptr = ini;

        for (let i = 0; i < lines.length; i++) {
            const line = INI.removeComment(lines[i]);

            if (line.length < 2) continue;

            if (line.charAt(0) === "[" && line.charAt(line.length - 1) === "]") {
                ptr = {};
                ini[line.substring(1, line.length - 1)] = ptr;
            } else {
                var key = line.substring(0, line.indexOf("="));
                var value = INI.parseValue(line.substring(line.indexOf("=") + 1, line.length));

                ptr[key] = value;
            }
            
        }

        return ini;
    },
    /** @param {string} string */
    removeComment: function (string) {
        if (string.indexOf(";") != -1) {
            return string.substring(0, string.indexOf(";")).trim();
        }
        return string;
    },
    /** @param {string} string */
    parseValue: function (thing) {
        var trimmed = thing.trim();

        if (!/\D/gi.test(trimmed) || trimmed === "Infinity" || trimmed === "NaN") {
            return +thing;
        }

        if (/true|false/ig.test(trimmed)) {
            return trimmed === "true";
        }

        return thing;
    },
    /** @param {Object} anObject */
    build: function (anObject) {
        var out = "", mainProps, sectionedProps, props;

        mainProps = Object.keys(anObject).filter(key => {
            return typeof anObject[key] !== "object";
        });
        
        sectionedProps = Object.keys(anObject).filter(key => typeof anObject[key] === "object");

        for (let i = 0; i < mainProps.length; i++) {
            const prop = mainProps[i];

            out += prop + "=" + anObject[prop] + "\n";
        };

        for (let i = 0; i < sectionedProps.length; i++) {
            const section = sectionedProps[i];
            out += "\n[" + section + "]\n"

            props = Object.keys(anObject[section]);

            for (let j = 0; j < props.length; j++) {
                const prop = props[j];

                var value = anObject[section][prop];
                if (typeof value === "object") {
                    throw new Error("INI files cannot have multi-layered sections!");
                }

                out += prop + "=" + value + "\n";
            }
        }

        return out;
    }
}

Object.freeze(INI)

if ("module" in globalThis) {
    module.exports = INI;
}
