import * as React from "react";
import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.js";
import Icon from "../../icon/Icon";
import * as utils from "../../utils";

export interface AlertProps {
    type: AlertType
    size?: AlertSize
    static?: boolean
    closeIcon?: boolean
    level?: AlertLevel
}

export enum AlertType {
    ERROR = "error",
    INFO = "info",
    DANGER = "danger",
    WARNING = "warning",
    SUCCESS = "success"
}

export enum AlertSize {
    DEFAULT = "default",
    COMPACT = "compact"
}

export enum AlertLevel {
    APP = "app"
}

export class Alert extends React.PureComponent<AlertProps> {
    constructor(props: AlertProps) {
        super(props);
    }

    private static getClassNames(props: AlertProps): (string | undefined)[] {
        return [
            "alert",
            (props.type ? `alert-${props.type}` : undefined),
            (props.size ? `alert-${props.size}` : undefined),
            (props.static ? "static" : undefined)
        ]
    }

    render() {
        const {children, closeIcon} = this.props;
        return (
            <div className={utils.classNames(Alert.getClassNames(this.props))}>
                <div className="alert-items">
                    {children}
                </div>
                {closeIcon &&
                    <button type="button" className="close" aria-label="Close">
                        <Icon shape="close"/>
                    </button>
                }
            </div>
        );
    }

}
