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
    selected: [],
    wire,
    statePath,
    init: function() {
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
      wire.dispatchFormEvent("filament-combobox::updateState", this.statePath, this.selected);
    }
  };
}
export {
  cbFormComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNiRm9ybUNvbXBvbmVudCh7XG4gICAgb3B0aW9ucyxcbiAgICBzZWxlY3RlZCxcbiAgICBzdGF0ZVBhdGgsXG4gICAgd2lyZVxufSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wdGlvbnNPcmlnaW5hbDogW10sXG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBzZWxlY3RlZE9yaWdpbmFsOiBbXSxcbiAgICAgICAgc2VsZWN0ZWQ6IFtdLFxuICAgICAgICB3aXJlOiB3aXJlLFxuICAgICAgICBzdGF0ZVBhdGg6IHN0YXRlUGF0aCxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlUm93cygpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zT3JpZ2luYWw7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZE9yaWdpbmFsO1xuICAgICAgICB9LFxuICAgICAgICBwcmVwYXJlUm93czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9yaWdpbmFsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBvcHRpb24ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNPcmlnaW5hbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogb3B0aW9uLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiAodGFyZ2V0LCBrZXl3b3JkKSB7XG4gICAgICAgICAgICB0aGlzW3RhcmdldF0gPSB0aGlzW3RhcmdldCArICdPcmlnaW5hbCddLmZpbHRlcihpdGVtID0+IGl0ZW0ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhrZXl3b3JkLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVIaWdobGlnaHQ6IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgICAgICAgICAgdGhpc1t0YXJnZXRdW2tleV0uaGlnaGxpZ2h0ZWQgPSAhdGhpc1t0YXJnZXRdW2tleV0uaGlnaGxpZ2h0ZWRcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZUl0ZW06IGZ1bmN0aW9uIChpdGVtLCBvcmlnaW4sIGRlc3RpbnkpIHtcbiAgICAgICAgICAgIHRoaXNbZGVzdGlueV0ucHVzaChpdGVtKVxuICAgICAgICAgICAgdGhpc1tvcmlnaW5dLnNwbGljZSh0aGlzW29yaWdpbl0uaW5kZXhPZihpdGVtKSwgMSlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZVRvUmlnaHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5vcHRpb25zLmZpbHRlcihpdGVtID0+IGl0ZW0uaGlnaGxpZ2h0ZWQpXG4gICAgICAgICAgICBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmhpZ2hsaWdodGVkID0gZmFsc2UpXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4uaXRlbXMpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gaXRlbXMubWFwKGkgPT4gaS52YWx1ZSkuaW5kZXhPZihpdGVtLnZhbHVlKSA9PT0gLTEpXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdmVUb0xlZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoaXRlbSA9PiBpdGVtLmhpZ2hsaWdodGVkKVxuICAgICAgICAgICAgaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5oaWdobGlnaHRlZCA9IGZhbHNlKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnB1c2goLi4uaXRlbXMpXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoaXRlbSA9PiBpdGVtcy5tYXAoaSA9PiBpLnZhbHVlKS5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMSlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZVRvUmlnaHRBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi50aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXVxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBtb3ZlVG9MZWZ0QWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucHVzaCguLi50aGlzLnNlbGVjdGVkKVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aXJlLmRpc3BhdGNoRm9ybUV2ZW50KCdmaWxhbWVudC1jb21ib2JveDo6dXBkYXRlU3RhdGUnLCB0aGlzLnN0YXRlUGF0aCwgdGhpcy5zZWxlY3RlZClcbiAgICAgICAgfVxuICAgIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixnQkFBaUM7QUFBQSxFQUNwQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNKLEdBQUc7QUFDQyxTQUFPO0FBQUEsSUFDSCxpQkFBaUIsQ0FBQztBQUFBLElBQ2xCLFNBQVMsQ0FBQztBQUFBLElBQ1Ysa0JBQWtCLENBQUM7QUFBQSxJQUNuQixVQUFVLENBQUM7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSxXQUFZO0FBQ2QsV0FBSyxZQUFZO0FBQ2pCLFdBQUssVUFBVSxLQUFLO0FBQ3BCLFdBQUssV0FBVyxLQUFLO0FBQUEsSUFDekI7QUFBQSxJQUNBLGFBQWEsV0FBWTtBQUNyQixjQUFRLFFBQVEsWUFBVTtBQUN0QixZQUFJLFNBQVMsUUFBUSxPQUFPLEtBQUssTUFBTSxJQUFJO0FBQ3ZDLGVBQUssaUJBQWlCLEtBQUs7QUFBQSxZQUN2QixPQUFPLE9BQU87QUFBQSxZQUNkLE9BQU8sT0FBTztBQUFBLFlBQ2QsYUFBYTtBQUFBLFVBQ2pCLENBQUM7QUFBQSxRQUNMLE9BQU87QUFDSCxlQUFLLGdCQUFnQixLQUFLO0FBQUEsWUFDdEIsT0FBTyxPQUFPO0FBQUEsWUFDZCxPQUFPLE9BQU87QUFBQSxZQUNkLGFBQWE7QUFBQSxVQUNqQixDQUFDO0FBQUEsUUFDTDtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFBQSxJQUNBLFFBQVEsU0FBVSxRQUFRLFNBQVM7QUFDL0IsV0FBSyxNQUFNLElBQUksS0FBSyxTQUFTLFVBQVUsRUFBRSxPQUFPLFVBQVEsS0FBSyxNQUFNLFlBQVksRUFBRSxTQUFTLFFBQVEsWUFBWSxDQUFDLENBQUM7QUFBQSxJQUNwSDtBQUFBLElBQ0EsaUJBQWlCLFNBQVUsUUFBUSxLQUFLO0FBQ3BDLFdBQUssTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLENBQUMsS0FBSyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQUEsSUFDdkQ7QUFBQSxJQUNBLFVBQVUsU0FBVSxNQUFNLFFBQVEsU0FBUztBQUN2QyxXQUFLLE9BQU8sRUFBRSxLQUFLLElBQUk7QUFDdkIsV0FBSyxNQUFNLEVBQUUsT0FBTyxLQUFLLE1BQU0sRUFBRSxRQUFRLElBQUksR0FBRyxDQUFDO0FBQ2pELFdBQUssWUFBWTtBQUFBLElBQ3JCO0FBQUEsSUFDQSxhQUFhLFdBQVk7QUFDckIsWUFBTSxRQUFRLEtBQUssUUFBUSxPQUFPLFVBQVEsS0FBSyxXQUFXO0FBQzFELFlBQU0sSUFBSSxVQUFRLEtBQUssY0FBYyxLQUFLO0FBQzFDLFdBQUssU0FBUyxLQUFLLEdBQUcsS0FBSztBQUMzQixXQUFLLFVBQVUsS0FBSyxRQUFRLE9BQU8sVUFBUSxNQUFNLElBQUksT0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEtBQUssS0FBSyxNQUFNLEVBQUU7QUFDN0YsV0FBSyxZQUFZO0FBQUEsSUFDckI7QUFBQSxJQUNBLFlBQVksV0FBWTtBQUNwQixZQUFNLFFBQVEsS0FBSyxTQUFTLE9BQU8sVUFBUSxLQUFLLFdBQVc7QUFDM0QsWUFBTSxJQUFJLFVBQVEsS0FBSyxjQUFjLEtBQUs7QUFDMUMsV0FBSyxRQUFRLEtBQUssR0FBRyxLQUFLO0FBQzFCLFdBQUssV0FBVyxLQUFLLFNBQVMsT0FBTyxVQUFRLE1BQU0sSUFBSSxPQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsS0FBSyxLQUFLLE1BQU0sRUFBRTtBQUMvRixXQUFLLFlBQVk7QUFBQSxJQUNyQjtBQUFBLElBQ0EsZ0JBQWdCLFdBQVk7QUFDeEIsV0FBSyxTQUFTLEtBQUssR0FBRyxLQUFLLE9BQU87QUFDbEMsV0FBSyxVQUFVLENBQUM7QUFDaEIsV0FBSyxZQUFZO0FBQUEsSUFDckI7QUFBQSxJQUNBLGVBQWUsV0FBWTtBQUN2QixXQUFLLFFBQVEsS0FBSyxHQUFHLEtBQUssUUFBUTtBQUNsQyxXQUFLLFdBQVcsQ0FBQztBQUNqQixXQUFLLFlBQVk7QUFBQSxJQUNyQjtBQUFBLElBQ0EsYUFBYSxXQUFZO0FBQ3JCLFdBQUssa0JBQWtCLGtDQUFrQyxLQUFLLFdBQVcsS0FBSyxRQUFRO0FBQUEsSUFDMUY7QUFBQSxFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
