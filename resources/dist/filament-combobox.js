// resources/js/index.js
function cbFormComponent({
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
    wire,
    statePath,
    init: function() {
      this.allOptions = options;
      this.prepareRows();
      this.options = this.optionsOriginal;
      this.selected = this.selectedOriginal;
    },
    prepareRows: function() {
      options.forEach((option) => {
        if (selected.indexOf(option.value) !== -1) {
          this.selectedOriginal.push({
            value: option.value,
            label: option.label,
            highlighted: false
          });
        } else {
          this.optionsOriginal.push({
            value: option.value,
            label: option.label,
            highlighted: false
          });
        }
      });
    },
    search: function(target, keyword) {
      this[target] = this[target + "Original"].filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase()));
    },
    toggleHighlight: function(target, key) {
      this[target][key].highlighted = !this[target][key].highlighted;
    },
    moveItem: function(item, origin, destiny) {
      this[destiny].push(item);
      this[origin].splice(this[origin].indexOf(item), 1);
      this.updateState();
    },
    moveToRight: function() {
      const items = this.options.filter((item) => item.highlighted);
      items.map((item) => item.highlighted = false);
      this.selected.push(...items);
      this.options = this.options.filter((item) => items.map((i) => i.value).indexOf(item.value) === -1);
      this.updateState();
    },
    moveToLeft: function() {
      const items = this.selected.filter((item) => item.highlighted);
      items.map((item) => item.highlighted = false);
      this.options.push(...items);
      this.selected = this.selected.filter((item) => items.map((i) => i.value).indexOf(item.value) === -1);
      this.updateState();
    },
    moveToRightAll: function() {
      this.selected.push(...this.options);
      this.options = [];
      this.updateState();
    },
    moveToLeftAll: function() {
      this.options.push(...this.selected);
      this.selected = [];
      this.updateState();
    },
    updateState: function() {
      const sortByOriginalIndex = (a, b) => {
        const indexA = this.allOptions.findIndex((o) => o.value === a.value);
        const indexB = this.allOptions.findIndex((o) => o.value === b.value);
        return indexA - indexB;
      };
      this.options.sort(sortByOriginalIndex);
      this.selected.sort(sortByOriginalIndex);
      wire.dispatchFormEvent("filament-combobox::updateState", this.statePath, this.selected);
    }
  };
}
export {
  cbFormComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNiRm9ybUNvbXBvbmVudCh7XG4gICAgb3B0aW9ucyxcbiAgICBzZWxlY3RlZCxcbiAgICBzdGF0ZVBhdGgsXG4gICAgd2lyZVxufSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wdGlvbnNPcmlnaW5hbDogW10sXG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBzZWxlY3RlZE9yaWdpbmFsOiBbXSxcbiAgICAgICAgYWxsT3B0aW9uczogW10sXG4gICAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICAgICAgd2lyZTogd2lyZSxcbiAgICAgICAgc3RhdGVQYXRoOiBzdGF0ZVBhdGgsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYWxsT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVSb3dzKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnNPcmlnaW5hbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkT3JpZ2luYWw7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXBhcmVSb3dzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihvcHRpb24udmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3JpZ2luYWwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IG9wdGlvbi5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc09yaWdpbmFsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBvcHRpb24ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uICh0YXJnZXQsIGtleXdvcmQpIHtcbiAgICAgICAgICAgIHRoaXNbdGFyZ2V0XSA9IHRoaXNbdGFyZ2V0ICsgJ09yaWdpbmFsJ10uZmlsdGVyKGl0ZW0gPT4gaXRlbS5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGtleXdvcmQudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZUhpZ2hsaWdodDogZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gICAgICAgICAgICB0aGlzW3RhcmdldF1ba2V5XS5oaWdobGlnaHRlZCA9ICF0aGlzW3RhcmdldF1ba2V5XS5oaWdobGlnaHRlZFxuICAgICAgICB9LFxuICAgICAgICBtb3ZlSXRlbTogZnVuY3Rpb24gKGl0ZW0sIG9yaWdpbiwgZGVzdGlueSkge1xuICAgICAgICAgICAgdGhpc1tkZXN0aW55XS5wdXNoKGl0ZW0pXG4gICAgICAgICAgICB0aGlzW29yaWdpbl0uc3BsaWNlKHRoaXNbb3JpZ2luXS5pbmRleE9mKGl0ZW0pLCAxKVxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBtb3ZlVG9SaWdodDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5oaWdobGlnaHRlZClcbiAgICAgICAgICAgIGl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uaGlnaGxpZ2h0ZWQgPSBmYWxzZSlcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi5pdGVtcylcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucy5maWx0ZXIoaXRlbSA9PiBpdGVtcy5tYXAoaSA9PiBpLnZhbHVlKS5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMSlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZVRvTGVmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcihpdGVtID0+IGl0ZW0uaGlnaGxpZ2h0ZWQpXG4gICAgICAgICAgICBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmhpZ2hsaWdodGVkID0gZmFsc2UpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucHVzaCguLi5pdGVtcylcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcihpdGVtID0+IGl0ZW1zLm1hcChpID0+IGkudmFsdWUpLmluZGV4T2YoaXRlbS52YWx1ZSkgPT09IC0xKVxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBtb3ZlVG9SaWdodEFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnRoaXMub3B0aW9ucylcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IFtdXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdmVUb0xlZnRBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKC4uLnRoaXMuc2VsZWN0ZWQpXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW11cbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvcnRCeU9yaWdpbmFsSW5kZXggPSAoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4QSA9IHRoaXMuYWxsT3B0aW9ucy5maW5kSW5kZXgobyA9PiBvLnZhbHVlID09PSBhLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleEIgPSB0aGlzLmFsbE9wdGlvbnMuZmluZEluZGV4KG8gPT4gby52YWx1ZSA9PT0gYi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4QSAtIGluZGV4QjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zb3J0KHNvcnRCeU9yaWdpbmFsSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zb3J0KHNvcnRCeU9yaWdpbmFsSW5kZXgpO1xuXG4gICAgICAgICAgICB3aXJlLmRpc3BhdGNoRm9ybUV2ZW50KCdmaWxhbWVudC1jb21ib2JveDo6dXBkYXRlU3RhdGUnLCB0aGlzLnN0YXRlUGF0aCwgdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsZ0JBQWlDO0FBQUEsRUFDcEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDSixHQUFHO0FBQ0MsU0FBTztBQUFBLElBQ0gsaUJBQWlCLENBQUM7QUFBQSxJQUNsQixTQUFTLENBQUM7QUFBQSxJQUNWLGtCQUFrQixDQUFDO0FBQUEsSUFDbkIsWUFBWSxDQUFDO0FBQUEsSUFDYixVQUFVLENBQUM7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSxXQUFZO0FBQ2QsV0FBSyxh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
