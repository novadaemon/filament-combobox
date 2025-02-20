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
        isSearchActive: { options: false, selected: false },
        searchKeyword: { options: '', selected: '' },
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
            this.isSearchActive[target] = keyword.length > 0;
            this.searchKeyword[target] = keyword;

            if (target === 'options') {
                this.options = this.optionsOriginal.filter(item =>
                    item.label.toLowerCase().includes(keyword.toLowerCase()) &&
                    !this.selectedOriginal.some(selectedItem => selectedItem.value === item.value)
                );
            } else if (target === 'selected') {
                this.selected = this.selectedOriginal.filter(item =>
                    item.label.toLowerCase().includes(keyword.toLowerCase())
                );
            }
        },
        toggleHighlight: function (target, key) {
            this[target][key].highlighted = !this[target][key].highlighted
        },
        moveItem: function (item, origin, destiny) {
            this[destiny].push(item)
            this[origin].splice(this[origin].indexOf(item), 1)
            if (destiny === 'selected') {
                this.selectedOriginal.push(item);
            } else if (destiny === 'options') {
                this.selectedOriginal = this.selectedOriginal.filter(i => i.value !== item.value);
            }
            this.updateState();
        },
        moveToRight: function () {
            const items = this.options.filter(item => item.highlighted)
            items.map(item => item.highlighted = false)
            this.selectedOriginal.push(...items)
            this.options = this.options.filter(item => items.map(i => i.value).indexOf(item.value) === -1)
            this.updateState();
        },
        moveToLeft: function () {
            const items = this.selected.filter(item => item.highlighted)
            items.map(item => item.highlighted = false)
            this.options.push(...items)
            this.selectedOriginal = this.selectedOriginal.filter(item => !items.some(i => i.value === item.value))
            this.updateState();
        },
        moveToRightAll: function () {
            const itemsToMove = this.isSearchActive.options ? this.options : this.optionsOriginal;
            this.selectedOriginal.push(...itemsToMove);
            this.options = [];

            if (this.isSearchActive.options) {
                this.optionsOriginal = this.optionsOriginal.filter(item =>
                    !itemsToMove.some(i => i.value === item.value)
                );
            } else {
                this.optionsOriginal = [];
            }

            this.updateState();
        },
        moveToLeftAll: function () {
            const itemsToMove = this.isSearchActive.selected ? this.selected : this.selectedOriginal;
            this.options.push(...itemsToMove);
            this.optionsOriginal.push(...itemsToMove);
            this.selected = [];

            if (this.isSearchActive.selected) {
                this.selectedOriginal = this.selectedOriginal.filter(item =>
                    !itemsToMove.some(i => i.value === item.value)
                );
            } else {
                this.selectedOriginal = [];
            }

            this.updateState();
        },
        updateState: function () {
            this.options = [...new Map(this.options.map(item => [item.value, item])).values()];
            this.selectedOriginal = [...new Map(this.selectedOriginal.map(item => [item.value, item])).values()];

            const sortByOriginalIndex = (a, b) => {
                const indexA = this.allOptions.findIndex(o => o.value === a.value);
                const indexB = this.allOptions.findIndex(o => o.value === b.value);
                return indexA - indexB;
            };

            this.options.sort(sortByOriginalIndex);
            this.selectedOriginal.sort(sortByOriginalIndex);

            if (this.isSearchActive.selected) {
                this.selected = this.selectedOriginal.filter(item =>
                    item.label.toLowerCase().includes(this.searchKeyword.selected.toLowerCase())
                );
            } else {
                this.selected = [...this.selectedOriginal];
            }

            wire.dispatchFormEvent('filament-combobox::updateState', this.statePath, this.selectedOriginal);
        }
    }
}
