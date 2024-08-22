import DB from "@/db/business.table";
import {ValidationError} from "@/error";
import BusinessType, { RequestBusiness, State } from "@type/business.types";
import {ALL_INDUSTRIES, VALID_INDUSTRIES} from "@constants/business.constants";


const stateMessageObj : {[key in State]: string}= {
    [State.new]: `Please provide the "industry" to move forward`,
    [State.market_approved]: `Please provde the "contactName" and "contactPhone" to move forward`,
    [State.market_declined]: "Sorry! Currently we are not supporting your industry. No more steps are required",
    [State.sales_approved]: "Sales team is proccessing your request",
    [State.won]: "Congratulations! Your business has been approved. No more steps are required",
    [State.lost]: "Sorry! Your business has been declined. No more steps are required",
}

const getNextSteps = (state: State) => {
    return stateMessageObj[state] || "No further steps are required";
};

const generalValidation = (business: RequestBusiness) => {
    if (!business.fein)
        throw new ValidationError("Business fein and name is required");

    if (business.fein.length !== 9)
        throw new ValidationError("Business fein must be 9 digits");
};

const createBusiness = (business: RequestBusiness) => {
    if (!business.name) 
        throw new ValidationError(`Please provide the Business "name" to register it`);

    const newBusiness: BusinessType = {
        fein: business.fein,
        name: business.name,
        state: State.new,
    };

    return DB.create(newBusiness);
}

const handleBusinessProgress = (
    reqBusiness: RequestBusiness
): { statusCode: number; nextSteps: string } => {
    generalValidation(reqBusiness);

    const business = DB.get(reqBusiness.fein);

    if (!business) {
        const newBusiness = createBusiness(reqBusiness);
        return { statusCode: 201, nextSteps: getNextSteps(newBusiness.state) };
    } else {
        if (business.state === State.new) {
            if (!reqBusiness.industry) 
                throw new ValidationError("Business industry is required for this step" );
            
            if (!ALL_INDUSTRIES.includes(reqBusiness.industry))
                throw new ValidationError(`Supported industries are: ${ALL_INDUSTRIES}` );
            
            business.industry = reqBusiness.industry;
            business.state = VALID_INDUSTRIES.includes(reqBusiness.industry) 
              ? State.market_approved
              : State.market_declined;
            
            DB.update(business.fein, business);
        } else if (business.state === State.market_approved) {
            // we can add more validations on contact here.
            if (!reqBusiness.contact?.name || !reqBusiness.contact?.phone)
                throw new ValidationError(`Please provde the "contactName" and "contactPhone" for the next steps`);
            
            business.contact = reqBusiness.contact;
            business.state = State.sales_approved;
            
            DB.update(business.fein, business);
        } else if (business.state === State.sales_approved) {
            // added a random function for some randomness in the sales team verification.
            // A manual sales team verification is required at this point.
            business.state = Math.random() > 0.2 ? State.won : State.lost;
            DB.update(business.fein, business);
        }
        return {statusCode: 200, nextSteps: getNextSteps(business.state)};
    }
};


const getAllBusinesses = () => {
    return DB.getAll();
}

export { handleBusinessProgress, getAllBusinesses };
