import * as React from "react";
import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.js";
import {Icon} from "../../icon";
import * as utils from "../../utils";
import {AlertItem} from "./AlertItem";

export interface AlertProps {
    closeable?: boolean | undefined
    children?: React.ReactNode | React.ReactNode[]
    level?: AlertLevel
    onClose?: React.MouseEventHandler<any>,
    size?: AlertSize
    isStatic?: boolean
    style?: any
    type: AlertType
}

export enum AlertType {
    INFO = "info",
    DANGER = "danger",
    WARNING = "warning",
    SUCCESS = "success"
}

export enum AlertSize {
    COMPACT = "compact"
}

export enum AlertLevel {
    APP = "app"
}

//TODO: Add alert paging for app-level alerts
//TODO: Improve alert action styling
export class Alert extends React.PureComponent<AlertProps> {
    constructor(props: AlertProps) {
        super(props);
    }

    private static getClassNames(props: AlertProps): (string | undefined)[] {
        const {type, isStatic, level, size} = props;
        return [
            "alert",
            (type ? `alert-${type}` : undefined),
            (size ? `alert-${size}` : undefined),
            (isStatic ? "static" : undefined),
            (level == AlertLevel.APP ? "alert-app-level" : undefined),
            (size == AlertSize.COMPACT ? "alert-sm" : undefined)
        ]
    }

    render() {
        const {type, children, closeable, onClose, style} = this.props;
        return (
            <div className={utils.classNames(Alert.getClassNames(this.props))}
                 role="alert"
                 style={style}>
                <div className="alert-items">
                    {Alert.withAlertType(type, children)}
                </div>
                {closeable &&
                <button type="button"
                        onClick={onClose}
                        className="close"
                        aria-label="Close">
                  <Icon aria-hidden="true" shape="close"/>
                </button>
                }
            </div>
        );
    }

    private static withAlertType(alertType: AlertType, children: utils.ReactChildren): utils.ReactChildren {
        return React.Children.map(children, (child => {
            const childEl = child as React.ReactElement;
            if (childEl.type === AlertItem)
                return React.cloneElement(childEl, {
                    type: alertType
                });
        }));
    }

}
