export interface IInforAdvertise {
    id: number
    name: string,
    status: boolean
}

export interface IArrayAdvertise {
    id: number,
    name: string,
    quantity: number
}

export interface IInformation {
    name: string;
    describe: string;
}

export interface IListSubCompaign {
    id: number;
    name: string;
    status: boolean
    ads: {
        id: number;
        name: string,
        quantity: number
    }[]
}
