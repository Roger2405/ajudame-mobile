import { OrderProductProps } from "./orderProduct";

// export declare global {
//     namespace ReactNavigation {
//         interface RootParamList {
//             Home: undefined;
//             Products: undefined;
//             Stock: undefined;
//         }
//         type StackParamList = {

//         }
//     }
// }

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
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    ProductForm: { id?: number };
    SignUp: undefined;
    SignIn: undefined;
    Summary: OrderProductProps[]
};

// export type RootTabParamList = {
//     TabSales: undefined;
//     TabProducts: undefined;
//     TabStock: undefined;
// };

// export type RootStackParamList = {
//     Root: NavigatorScreenParams<RootTabParamList> | undefined;
//     AddSales: undefined;
//     Root: NavigatorScreenParams<RootTabParamList> | undefined;
//     ProductForm: { id?: number };
//     SignUp: undefined;
//     SignIn: undefined;
//     Summary: OrderProductProps[]
// };