/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import {ReactElement, ReactNode} from "react";
import {Icon} from "../../icon";
import * as utils from "../../utils";
import {AlertType} from ".";

export type AlertItemProps = {
    actions?: React.ReactElement;
    type?: AlertType;
    children?: React.ReactNode | React.ReactNode[];
    icon?: React.ReactElement;
    static?: boolean;
};

export class AlertItem extends React.PureComponent<AlertItemProps> {
    private static iconWithAlertClass(alertType: AlertType | undefined, icon: ReactElement | undefined): any {
        if (icon) {
            return (React.cloneElement(icon, {
                shape: icon.props.shape || AlertItem.defaultIconShape(alertType),
                className: "alert-icon " + icon.props.className,
            }) as ReactNode) as Icon;
        }
        return <Icon className="alert-icon" shape={AlertItem.defaultIconShape(alertType)} />;
    }

    private static renderActions(actions: React.ReactElement): ReactElement[] {
        return React.Children.map(actions, child => {
            return React.cloneElement(child, {
                className: child.props.className + " alert-action",
            });
        });
    }

    render() {
        const {actions, type, children, icon} = this.props;
        let classNames = ["alert-item"];
        if (this.props.static) classNames.push("static");
        return (
            <div className={utils.classNames(classNames)}>
                <div className="alert-icon-wrapper">{AlertItem.iconWithAlertClass(type, icon)}</div>
                <div className="alert-text">
                    <div style={{wordBreak: "break-word"}}>{children}</div>
                </div>
                {actions && <div className="alert-actions">{AlertItem.renderActions(actions)}</div>}
            </div>
        );
    }

    private static defaultIconShape(alertType: AlertType | undefined): string {
        switch (alertType) {
            case AlertType.DANGER:
                return "error-standard";
            case AlertType.WARNING:
                return "warning-standard";
            case AlertType.INFO:
                return "info-standard";
            case AlertType.SUCCESS:
                return "success-standard";
            default:
                return "info-standard";
        }
    }
}
