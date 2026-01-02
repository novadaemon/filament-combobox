export default function cbFormComponent({
  options,
  selected,
  statePath,
  state,
  wire,
}) {
    return {
        options: [],
        selected: [],
        optionsOriginal: [],
        selectedOriginal: [],
        allOptions: [],
        state: state,
        wire: wire,
        statePath: statePath,
        searchState: {
            options: {
                active: false,
                keyword: ''
            },
            selected: {
                active: false,
                keyword: ''
            }
        },

        init: function () {
            this.allOptions = options;
            this.prepareInitialData();
            this.syncDisplayWithMaster();
        },

        prepareInitialData: function () {
            this.optionsOriginal = [];
            this.selectedOriginal = [];

            options.forEach(option => {
                const item = {
                    value: option.value,
                    label: option.label,
                    highlighted: false
                };

                if (selected.map(String).includes(String(option.value))) {
                    this.selectedOriginal.push(item);
                } else {
                    this.optionsOriginal.push(item);
                }
            });
        },

        syncDisplayWithMaster: function() {
            if (this.searchState.options.active) {
                const keyword = this.searchState.options.keyword.toLowerCase();
                this.options = this.optionsOriginal.filter(item =>
                    item.label.toLowerCase().includes(keyword)
                );
            } else {
                this.options = [...this.optionsOriginal];
            }

            if (this.searchState.selected.active) {
                const keyword = this.searchState.selected.keyword.toLowerCase();
                this.selected = this.selectedOriginal.filter(item =>
                    item.label.toLowerCase().includes(keyword)
                );
            } else {
                this.selected = [...this.selectedOriginal];
            }
        },

        search: function (target, keyword) {
            console.log('search', target, keyword);
            this.searchState[target].keyword = keyword;
            this.searchState[target].active = keyword.length > 0;
            this.syncDisplayWithMaster();
        },

        toggleHighlight: function (target, key) {
            this[target][key].highlighted = !this[target][key].highlighted;
        },

        moveItem: function (item, fromType, toType) {
            const fromOriginal = fromType === 'options' ? 'optionsOriginal' : 'selectedOriginal';
            const toOriginal = toType === 'options' ? 'optionsOriginal' : 'selectedOriginal';

            const existingItem = this[toOriginal].find(i => i.value === item.value);
            if (existingItem) {
                return;
            }

            const itemToMove = this[fromOriginal].find(i => i.value === item.value);
            if (!itemToMove) {
                return;
            }

            this[fromOriginal] = this[fromOriginal].filter(i => i.value !== item.value);
            this[toOriginal].push({ ...itemToMove, highlighted: false });

            this.syncDisplayWithMaster();
            this.updateState();
        },

        moveToRight: function () {
            const itemsToMove = this.options.filter(item => item.highlighted);
            itemsToMove.forEach(item => {
                const originalItem = this.optionsOriginal.find(i => i.value === item.value);
                if (originalItem) {
                    this.moveItem(originalItem, 'options', 'selected');
                }
            });
        },

        moveToLeft: function () {
            const itemsToMove = this.selected.filter(item => item.highlighted);
            itemsToMove.forEach(item => {
                const originalItem = this.selectedOriginal.find(i => i.value === item.value);
                if (originalItem) {
                    this.moveItem(originalItem, 'selected', 'options');
                }
            });
        },

        moveToRightAll: function () {
            const sourceItems = this.searchState.options.active ?
                this.options : this.optionsOriginal;

            sourceItems.forEach(item => {
                const originalItem = this.optionsOriginal.find(i => i.value === item.value);
                if (originalItem && !this.selectedOriginal.some(s => s.value === item.value)) {
                    this.selectedOriginal.push({ ...originalItem, highlighted: false });
                }
            });

            this.optionsOriginal = this.optionsOriginal.filter(item =>
                !sourceItems.some(s => s.value === item.value)
            );

            if (!this.searchState.options.active) {
                this.searchState.options.keyword = '';
            }

            this.syncDisplayWithMaster();
            this.updateState();
        },

        moveToLeftAll: function () {
            const sourceItems = this.searchState.selected.active ?
                this.selected : this.selectedOriginal;

            sourceItems.forEach(item => {
                const originalItem = this.selectedOriginal.find(i => i.value === item.value);
                if (originalItem && !this.optionsOriginal.some(o => o.value === item.value)) {
                    this.optionsOriginal.push({ ...originalItem, highlighted: false });
                }
            });

            if (this.searchState.selected.active) {
                const itemsToRemove = new Set(sourceItems.map(item => item.value));
                this.selectedOriginal = this.selectedOriginal.filter(item => !itemsToRemove.has(item.value));
            } else {
                this.selectedOriginal = [];
            }

            if (!this.searchState.selected.active) {
                this.searchState.selected.keyword = '';
            }

            this.syncDisplayWithMaster();
            this.updateState();
        },

        updateState: function () {
            this.optionsOriginal = [...new Map(this.optionsOriginal.map(item => [item.value, item])).values()];
            this.selectedOriginal = [...new Map(this.selectedOriginal.map(item => [item.value, item])).values()];

            const sortByOriginalIndex = (a, b) => {
                const indexA = this.allOptions.findIndex(o => o.value === a.value);
                const indexB = this.allOptions.findIndex(o => o.value === b.value);
                return indexA - indexB;
            };

            this.optionsOriginal.sort(sortByOriginalIndex);
            this.selectedOriginal.sort(sortByOriginalIndex);

            this.syncDisplayWithMaster();

            this.state = this.selectedOriginal.map(item => item.value);

        }
    }
}
