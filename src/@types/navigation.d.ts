import { OrderProductProps } from "./orderProduct";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Products: undefined;
            Stock: undefined;
        }
        interface StackParamList {
            AddSales: undefined;
            Summary: undefined;//OrderProductProps[];
        }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    AddSales: undefined;
    Modal: undefined;
    NotFound: undefined;
  };