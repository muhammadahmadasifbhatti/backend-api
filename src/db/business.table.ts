import CustomError from '@/error';
import BusinessType from '@type/business.types';

const DB = () => {
    const Businesses = new Map<string, BusinessType>();

    const create = (business: BusinessType) => {
        if (!business.fein || !business.name )
            throw new CustomError({statusCode: 400, message: 'Business fein and name is required'});

        if (business.fein.length !== 9) 
            throw new CustomError({statusCode: 400, message: 'Business fein must be 9 digits'});

        if (Businesses.has(business.fein))
            throw new CustomError({statusCode: 400, message: `Business with fein:${business.fein} already exists`});

        Businesses.set(business.fein, business);
        return business;
    }

    const update = (fein: string, business: BusinessType) => {
        if (!Businesses.has(fein)) {
            throw new CustomError({statusCode: 400, message: `Business with fein:${fein} not found`});
        }

        Businesses.set(fein, business);
        return business;
    }

    const get = (fein: string | undefined) => {
        if (!fein) throw new CustomError({
            statusCode: 400,
            message: 'Business fein is required'
        })
        return Businesses.get(fein);
    }

    const getAll = () => {
        console.log("Businesses.values()", Businesses)
        return Array.from(Businesses.values());
    }

    return {create, update, get, getAll};
}

const _DB = DB();
export default _DB;