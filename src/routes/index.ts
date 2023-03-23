import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFilename = (filename: string) => {
  return filename.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFilename(filename);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
