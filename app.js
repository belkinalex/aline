const booksUsecase = require('./books/ucs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new Koa();

require('./handlers/static').init(app);

const usersRouter = new Router({
  prefix: '/books'
});

async function handleValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name == "ValidationError") {
      ctx.status = 400;

      let errors = {};

      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }

      ctx.body = {
        errors: errors
      };

    } else {
      throw err;
    }
  }
}

usersRouter
  .post('/', handleValidationError, async (ctx) => {
    const {title, date, author, description, image} = ctx.request.body;
    const res = await booksUsecase.addBook(title, date, author, description, image);
    ctx.body = {"id": res};
  })
  .get('/', async function(ctx) {
    const {id, title, date, author, description, image, limit, offset} = ctx.request.query;
    const res = await booksUsecase.getBooks(id || null, title || null, date || null, author || null,
      description || null, image || null, limit || 20, offset || 0);
    ctx.body = res;
  })
  .patch('/', handleValidationError, async (ctx) => {
    const {id, title, date, author, description, image} = ctx.request.body;
    const res = await booksUsecase.editBook(id || null, title || null, date || null, author || null,
      description || null, image || null);
    ctx.body = res;
  });

app.use(bodyParser());
app.use(usersRouter.routes());

module.exports = app;
