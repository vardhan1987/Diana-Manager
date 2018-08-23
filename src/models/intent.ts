export class Intent {

    action: Action;
    type: string;
    speechText: string[];
    displayText: string[];
    images: Image[];
    buttons: Button[];

}

export interface Action {
    intentName: string;
    hasSlots: boolean;
    fulfilled: boolean;
    utterances: string[];
    slots: string[];
}

export interface Button {
    name: string;
    value: string;
    buttonId: string;
    className: string;
}

export interface Image {
    url: string;
    alt: string;
}


