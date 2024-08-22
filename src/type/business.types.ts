enum Industry {
    restaurant = 'restaurant',
    stores = 'stores',
    wholesale = 'wholesale',
    services = 'services',
}

type Contact = {
    name?: string;
    phone?: string;
}

enum State {
    new = 2000,
    market_approved = 2001,
    market_declined = 2002,
    sales_approved = 2003,
    won = 2004,
    lost = 2005,
}

type BusinessType = {
    fein: string;
    name: string;
    industry?: Industry;
    contact?: Contact;
    state: State
}

type RequestBusiness = Partial<Omit<BusinessType, 'state'>> & {fein: string};

export default BusinessType;
export { Industry, Contact, State, RequestBusiness };