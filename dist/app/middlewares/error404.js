"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404 = void 0;
function error404(req, res) {
    res.status(404).json({ Error: 'Page not Found' });
}
exports.error404 = error404;
