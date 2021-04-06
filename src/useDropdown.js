import React, { useState } from 'react';

const useDropdown = (label, defaultState, options) => {
    const [state, setState] = useState(defaultState);
    const id = `use-dropdown-${label.replace("", "").toLowerCase()}`
    // Remember to use brackets "(" instead of "{"
    const Dropdown = () => (
        <label htmlFor={id}>
            {label}
            <select
                id={id}
                value={state}
                onChange={e => setState(e.target.value)}
                onBlur={e => setState(e.target.value)}
                disabled={options.length === 0}>
                <option>All</option>
                {/* Map array of item strings into option elements */}
                {/* Why keys? React will re-render the view on changes like adding or removing items. */}
                {/* Unique keys help React realize that it's just the order that has changed, saving React */}
                {/* the trouble of removing options and adding them later on down in the options list */}
                {options.map(item => (
                    <option key={item} value={item}>{item}</option>
                    )
                )
                }
            </select>
        </label>
    );

    return [state, Dropdown, setState];
}

export default useDropdown;