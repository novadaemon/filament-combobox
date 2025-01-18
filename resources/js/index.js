export default function cbFormComponent({
    options,
    selected,
    statePath,
    wire
}) {
    return {
        optionsOriginal: [],
        options: [],
        selectedOriginal: [],
        allOptions: [],
        selected: [],
        wire: wire,
        statePath: statePath,
        init: function () {
            this.allOptions = options;
            this.prepareRows();
            this.options = this.optionsOriginal;
            this.selected = this.selectedOriginal;
        },
        prepareRows: function () {
            options.forEach(option => {
                if (selected.indexOf(option.value) !== -1) {
                    this.selectedOriginal.push({
                        value: option.value,
                        label: option.label,
                        highlighted: false
                    })
                } else {
                    this.optionsOriginal.push({
                        value: option.value,
                        label: option.label,
                        highlighted: false
                    })
                }
            })
        },
        search: function (target, keyword) {
            if (target === 'options') {
                // Only filter items on the left side
                this.options = this.optionsOriginal.filter(item =>
                    item.label.toLowerCase().includes(keyword.toLowerCase()) &&
                    !this.selected.some(selectedItem => selectedItem.value === item.value)
                );
            } else if (target === 'selected') {
                // Only filter items on the right side
                this.selected = this.selected.filter(item =>
                    item.label.toLowerCase().includes(keyword.toLowerCase()) &&
                    !this.options.some(optionItem => optionItem.value === item.value)
                );
            }
        },
        toggleHighlight: function (target, key) {
            this[target][key].highlighted = !this[target][key].highlighted
        },
        moveItem: function (item, origin, destiny) {
            this[destiny].push(item)
            this[origin].splice(this[origin].indexOf(item), 1)
            this.updateState();
        },
        moveToRight: function () {
            const items = this.options.filter(item => item.highlighted)
            items.map(item => item.highlighted = false)
            this.selected.push(...items)
            this.options = this.options.filter(item => items.map(i => i.value).indexOf(item.value) === -1)
            this.updateState();
        },
        moveToLeft: function () {
            const items = this.selected.filter(item => item.highlighted)
            items.map(item => item.highlighted = false)
            this.options.push(...items)
            this.selected = this.selected.filter(item => items.map(i => i.value).indexOf(item.value) === -1)
            this.updateState();
        },
        moveToRightAll: function () {
            this.selected.push(...this.options)
            this.options = []
            this.updateState();
        },
        moveToLeftAll: function () {
            this.options.push(...this.selected)
            this.selected = []
            this.updateState();
        },
        updateState: function () {
            const sortByOriginalIndex = (a, b) => {
                const indexA = this.allOptions.findIndex(o => o.value === a.value);
                const indexB = this.allOptions.findIndex(o => o.value === b.value);
                return indexA - indexB;
            };

            this.options.sort(sortByOriginalIndex);
            this.selected.sort(sortByOriginalIndex);

            wire.dispatchFormEvent('filament-combobox::updateState', this.statePath, this.selected);
        }
    }
}
