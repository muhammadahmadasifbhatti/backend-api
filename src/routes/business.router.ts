import { Router } from "express";
import { RequestBusiness } from "@type/business.types";
import * as BusinessServices from '@services/business.services';


const businessRouter = Router();

businessRouter.put('/:fein/workflow-progress', (req, res, next) => {
    const { fein } = req.params;
    const { name, industry, contactName, contactPhone } = req.body;

    const business: RequestBusiness = {
        fein,
        name,
        industry,
        contact: {
            name: contactName,
            phone: contactPhone
        }
    };

    try {
        const {statusCode, nextSteps} = 
            BusinessServices.handleBusinessProgress(business);

        res.status(statusCode).send(nextSteps);
    }
    catch (error: any) {
        next(error);
    }
});

businessRouter.get('/', (req, res, next) => {
    try {
        const businesses = BusinessServices.getAllBusinesses();
        res.status(200).send(businesses);
    }
    catch (error: any) {
        next(error);
    }
});


export default businessRouter;