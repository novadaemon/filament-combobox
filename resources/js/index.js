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
        selected: [],
        wire: wire,
        statePath: statePath,
        init: function () {
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
            this[target] = this[target + 'Original'].filter(item => item.label.toLowerCase().includes(keyword.toLowerCase()))
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
            wire.dispatchFormEvent('filament-combobox::updateState', this.statePath, this.selected)
        }
    }
}