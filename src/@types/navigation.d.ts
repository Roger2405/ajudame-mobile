

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
export type RootParamList = {
    Home: undefined;
    Products: undefined;
    Stock: undefined;
}


export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NewSale: undefined;
    ProductForm: { id?: number };
    HistoricDetails: { date: string }
    SignUp: undefined;
    SignIn: undefined;
    Summary: undefined
};

