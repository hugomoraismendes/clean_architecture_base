import { NextFunction, Request, Response } from 'express';

export default function executeRule(rule: string, presenterRule?: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { container } = req;
    const controller: any = container.resolve(`${rule}Controller`);
    const presenter: any = container.resolve(`${presenterRule ?? rule}Presenter`);

    await controller.run(req, res, next);
    const view = presenter.view;
    return res.status(view.statusCode).json(view.body);
  };
}
