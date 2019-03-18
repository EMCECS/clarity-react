export type ReactChildren = (React.ReactNode) | (React.ReactNode[] & React.ReactNode);

export function classNames(classNameList: (false|undefined|null|string)[]) {
    return classNameList.filter(x => typeof x === 'string').join(' ');
}

