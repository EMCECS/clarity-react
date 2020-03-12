import * as React from "react";
import {Icon, Direction} from "../../icon";
import * as Moment from "moment";
import {classNames} from "../../utils";

/**
 * DatePicker Props
 * @param {value} date value
 * @param {locale} regional code
 * @param {defaultValue} default date value
 * @param {dataqa} quality engineering testing field
 */
export type DatePickerProps = {
    value?: Date;
    locale?: string;
    defaultValue?: Date | string;
    dataqa?: string;
    onChange?: (newValue: string | Date) => void;
};

export type DatePickerState = {
    isOpen: boolean;
    value: string;
    navValue: Moment.Moment;
    viewMode: ViewMode;
    inputFocused: boolean;
};

enum ViewMode {
    Day,
    Month,
    Year,
}

const CalendarTableWeekDays: React.FunctionComponent = () => {
    return (
        <table className="calendar-table weekdays">
            <tbody>
                <tr className="calendar-row">
                    {Moment.weekdaysShort(true).map((day: string) => {
                        return (
                            <td key={"day_" + day} className="calendar-cell weekday">
                                {day.substring(0, 1)}
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
};

export class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
    static defaultProps: DatePickerProps = {
        locale: "en",
        value: undefined,
        defaultValue: undefined,
        onChange: undefined,
    };

    private calRef = React.createRef<HTMLDivElement>();
    private inputRef = React.createRef<HTMLInputElement>();

    static validDate(date: Date) {
        if (isNaN(date.getTime())) return new Date();
        return date;
    }

    state: DatePickerState = {
        viewMode: ViewMode.Day,
        isOpen: false, // prettier
        value: this.value,
        navValue:
            this.props.value !== undefined
                ? Moment(DatePicker.validDate(this.props.value))
                : Moment(this.props.defaultValue),
        inputFocused: false,
    };

    get value() {
        const {value, defaultValue} = this.props;
        let result: string = ""; // in case we don't have a default or hard set value.
        if (value !== undefined) result = DatePicker.dateToString(value);
        if (defaultValue !== undefined) result = DatePicker.dateToString(defaultValue);
        return result;
    }

    handleToggle() {
        this.toggle();
    }

    toggle(isOpen = !this.state.isOpen) {
        this.setState(
            {
                isOpen: isOpen,
                viewMode: ViewMode.Day,
                navValue:
                    isOpen && this.state.value.length > 0
                        ? Moment(
                              DatePicker.validDate(new Date(this.state.value)),
                              Moment.localeData(this.props.locale).longDateFormat("L"),
                          )
                        : this.state.navValue,
            },
            this.afterToggle,
        );
    }

    afterToggle = () => {
        if (this.state.isOpen) {
            this.subscribeDocumentClick();
        } else {
            this.unsubscribeDocumentClick();
        }
    };

    subscribeDocumentClick = () => {
        window.addEventListener("click", this.handleDocumentClick as any, true);
    };

    unsubscribeDocumentClick = () => {
        window.removeEventListener("click", this.handleDocumentClick as any, true);
    };

    handleDocumentClick = (evt: React.MouseEvent<HTMLElement>) => {
        if (!this.state.isOpen) return;
        const target = (evt.target as any) as HTMLElement;
        const el = this.calRef.current;
        if (!el || typeof el === "string") {
            console.warn("wrong element type");
            return;
        }
        if (!el.contains(target)) {
            this.toggle(false);
        }
    };

    handleSelectedDate(date: Date) {
        this.setState(
            {
                isOpen: false, // prettier
                value: DatePicker.dateToString(date),
                navValue: Moment(date),
            },
            this.afterSelectedDate,
        );
    }

    afterSelectedDate = () => {
        this.inputRef.current!.focus();
        if (this.props.onChange) this.props.onChange(new Date(this.state.value));
    };

    toggleViewMode(mode: ViewMode) {
        this.setState({viewMode: mode});
    }

    toggleNavValueMonth(month: number) {
        const newValue = Moment(this.state.navValue);
        newValue.month(month);
        this.setState({viewMode: ViewMode.Day, navValue: newValue});
    }

    toggleNavValueYear(year: number) {
        const newValue = Moment(this.state.navValue);
        newValue.year(year);
        this.setState({viewMode: ViewMode.Day, navValue: newValue});
    }

    toggleNavValueYear10(year: number) {
        const newValue = Moment(this.state.navValue);
        newValue.year(newValue.year() + year);
        this.setState({navValue: newValue});
    }

    toggleNavValue() {
        this.setState({viewMode: ViewMode.Day, navValue: Moment()});
    }

    private static numDaysFromPrevMonth(year: number, month: number): number {
        let tempDate = Moment();
        tempDate.year(year);
        tempDate.month(month);
        tempDate.date(1);
        return tempDate.day();
    }

    private static dateToString(date: Date | string, locale: string = "en"): string {
        if (typeof date === "string") return date;
        return Moment(date)
            .locale(locale)
            .format("L");
    }

    private handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {
                value: evt.target.value,
                navValue: Moment(
                    DatePicker.validDate(new Date(evt.target.value)),
                    Moment.localeData(this.props.locale).longDateFormat("L"),
                ),
            },
            this.afterInputChange,
        );
    };

    private handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        this.setState({inputFocused: false});
    };

    private handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        this.setState({inputFocused: true});
    };

    private afterInputChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };

    private buildDateClasses(isSelected: boolean, isToday: boolean, isDisabled: boolean) {
        return classNames([
            "day-btn", // prettier
            isSelected && !isToday && "is-selected",
            isToday && "is-today",
            isDisabled && "is-disabled",
        ]);
    }

    private calculateTabIndex(isSelected: boolean, isToday: boolean, selectedSameMonth: boolean): number {
        return selectedSameMonth ? (isSelected ? 0 : -1) : isToday ? 0 : -1;
    }

    private calculateFocus(isSelected: boolean, isToday: boolean, selectedSameMonth: boolean) {
        return selectedSameMonth ? (isSelected ? true : false) : isToday ? true : false;
    }

    render() {
        const {isOpen, viewMode, navValue, inputFocused, value} = this.state;
        const {locale, dataqa} = this.props;
        const navMonth = navValue.month();
        const navYear = navValue.year();
        const daysFromPrevMonth = DatePicker.numDaysFromPrevMonth(navYear, navMonth);
        let calendar = Moment()
            .year(navYear)
            .month(navMonth)
            .date(1)
            .subtract(daysFromPrevMonth, "days");
        const moment = Moment(value, Moment.localeData(locale).longDateFormat("L"));
        const selectedSameMonth = moment.isSame(navValue, "month");
        return (
            <div ref={this.calRef} className="clr-control-container" data-qa={dataqa}>
                <div className="clr-input-wrapper">
                    <div
                        className={classNames([
                            "clr-input-group", //prettier
                            inputFocused && "clr-focus",
                        ])}
                    >
                        <input
                            ref={this.inputRef}
                            type="text"
                            className="clr-input"
                            placeholder={Moment.localeData(locale).longDateFormat("L")}
                            value={value}
                            onFocus={this.handleInputFocus}
                            onBlur={this.handleInputBlur}
                            onChange={this.handleInputChange}
                        />
                        <button
                            className="clr-input-group-icon-action"
                            type="button"
                            title="Open"
                            onClick={this.handleToggle.bind(this)}
                        >
                            <Icon shape="calendar" />
                        </button>
                        {isOpen && (
                            <div
                                className="datepicker"
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    bottom: "auto",
                                    right: "auto",
                                }}
                            >
                                {viewMode === ViewMode.Day && (
                                    <div className="daypicker">
                                        <div className="calendar-header">
                                            <div className="calendar-pickers">
                                                <button
                                                    className="calendar-btn monthpicker-trigger"
                                                    type="button"
                                                    onClick={this.toggleViewMode.bind(this, ViewMode.Month)}
                                                >
                                                    {navValue.format("MMM")}
                                                </button>
                                                <button
                                                    className="calendar-btn yearpicker-trigger"
                                                    type="button"
                                                    onClick={this.toggleViewMode.bind(this, ViewMode.Year)}
                                                >
                                                    {navValue.format("YYYY")}
                                                </button>
                                            </div>
                                            <div className="calendar-switchers">
                                                <button
                                                    className="calendar-btn switcher"
                                                    type="button"
                                                    onClick={this.toggleNavValueMonth.bind(this, navValue.month() - 1)}
                                                >
                                                    <Icon shape="angle" dir={Direction.LEFT} />
                                                </button>
                                                <button
                                                    className="calendar-btn switcher"
                                                    type="button"
                                                    onClick={this.toggleNavValue.bind(this)}
                                                >
                                                    <Icon shape="event" />
                                                </button>
                                                <button
                                                    className="calendar-btn switcher"
                                                    type="button"
                                                    onClick={this.toggleNavValueMonth.bind(this, navValue.month() + 1)}
                                                >
                                                    <Icon shape="angle" dir={Direction.RIGHT} />
                                                </button>
                                            </div>
                                        </div>
                                        <CalendarTableWeekDays />
                                        <table className="calendar-table calendar-dates">
                                            <tbody>
                                                {[0, 1, 2, 3, 4, 5].map((row: number) => {
                                                    return (
                                                        <tr key={"tr_" + row} className="calendar-row">
                                                            {[0, 1, 2, 3, 4, 5, 6].map((cell: number) => {
                                                                const isToday = calendar.isSame(Moment(), "day"); // are we on today?
                                                                const isSelected = calendar.isSame(moment, "day"); // are we on selected?
                                                                const isDisabled = !navValue.isSame(calendar, "month");
                                                                const day = (
                                                                    <td key={"td_" + cell} className="calendar-cell">
                                                                        <div className="day">
                                                                            <button
                                                                                type="button"
                                                                                className={this.buildDateClasses(
                                                                                    isSelected,
                                                                                    isToday,
                                                                                    isDisabled,
                                                                                )}
                                                                                tabIndex={this.calculateTabIndex(
                                                                                    isSelected,
                                                                                    isToday,
                                                                                    selectedSameMonth,
                                                                                )}
                                                                                autoFocus={this.calculateFocus(
                                                                                    isSelected,
                                                                                    isToday,
                                                                                    selectedSameMonth,
                                                                                )}
                                                                                onClick={this.handleSelectedDate.bind(
                                                                                    this,
                                                                                    calendar.toDate(),
                                                                                )}
                                                                            >
                                                                                {calendar.date()}
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                );
                                                                calendar.add(1, "day");
                                                                return day;
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {viewMode === ViewMode.Month && (
                                    <div className="monthpicker">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month: number) => {
                                            return (
                                                <button
                                                    type="button" //prettier
                                                    className={classNames([
                                                        "calendar-btn", //prettier
                                                        "month",
                                                        month === 0 && "is-selected",
                                                    ])}
                                                    autoFocus={month === 0 ? true : false}
                                                    tabIndex={month === 0 ? 0 : -1}
                                                    onClick={this.toggleNavValueMonth.bind(this, month)}
                                                >
                                                    {Moment()
                                                        .month(month)
                                                        .format("MMMM")}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                {viewMode === ViewMode.Year && (
                                    <div className="yearpicker">
                                        <div className="year-switchers">
                                            <button
                                                type="button"
                                                className="calendar-btn switcher"
                                                onClick={this.toggleNavValueYear10.bind(this, -10)}
                                            >
                                                <Icon shape="angle" dir={Direction.LEFT} />
                                            </button>
                                            <button
                                                type="button"
                                                className="calendar-btn switcher"
                                                onClick={this.toggleNavValue.bind(this)}
                                            >
                                                <Icon shape="event" />
                                            </button>
                                            <button
                                                type="button"
                                                className="calendar-btn switcher"
                                                onClick={this.toggleNavValueYear10.bind(this, 10)}
                                            >
                                                <Icon shape="angle" dir={Direction.RIGHT} />
                                            </button>
                                        </div>
                                        <div className="years">
                                            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((year_index: number) => {
                                                const moment = Moment(navValue).subtract(year_index, "year");
                                                return (
                                                    <button
                                                        type="button"
                                                        className="calendar-btn year"
                                                        onClick={this.toggleNavValueYear.bind(this, moment.year())}
                                                    >
                                                        {moment.format("YYYY")}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
