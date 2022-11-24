var INI = {
    parse: function (stream) {
        var ini = {}, ptr = ini, lines = stream.split("\n");

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith("[") && line.trim().endsWith("]")) {
                ptr = {};
                ini[line.substring(1, line.length - 1)] = ptr;
            } else if (line.indexOf("=") != -1 && !line.startsWith(";")) {
                var name = line.substring(0, line.indexOf("=")).trim(),
                    value = line.substring(line.indexOf("=") + 1, line.length),
                    trimmed = value.trim();
                if (/true|false/ig.test(trimmed)) {
                    value = trimmed.toLowerCase() === "true";
                } else if (+trimmed == parseFloat(trimmed)) {
                    value = +trimmed;
                }
                ptr[name] = value;
            }
        }

        return ini;
    },
    generate: function (object) {
        var result = "";

        var keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i], value = object[key];
            if (typeof value == "object") {
                result += "\n[" + key + "]\n";
                const tkeys = Object.keys(value);
                for (let j = 0; j < tkeys.length; j++) {
                    const tkey = tkeys[j];
                    result += tkey.toString() + " = " + value[tkey].toString() + "\n";
                }
            } else {
                result += key + " = " + object[key].toString() + "\n";
            }
        }

        return result;
    }
}

if ("module" in globalThis) {
    module.exports = INI;
}
