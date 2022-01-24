"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const memory_1 = require("./database/memory");
const auth_1 = __importDefault(require("./routes/auth"));
const recipe_1 = __importDefault(require("./routes/recipe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, '../views', '404.html'));
});
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api/auth', auth_1.default);
app.use('/api/recipes', recipe_1.default);
// connect db
if (process.env.NODE_ENV === 'test') {
    (0, memory_1.connectTestDB)();
}
else {
    (0, memory_1.connectDB)();
}
console.log(process.env.NODE_ENV);
// connectDB()
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.set('views', path_1.default.join(`${__dirname}/../`, 'views'));
app.set('view engine', 'ejs');
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});
exports.default = app;
