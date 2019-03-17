import * as React from "react";
import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.js";
import {Icon} from "../../icon";
import * as utils from "../../utils";

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
        const {children, closeable, onClose, style} = this.props;
        return (
            <div className={utils.classNames(Alert.getClassNames(this.props))}
                 style={style}>
                <div className="alert-items">
                    {children}
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

}
