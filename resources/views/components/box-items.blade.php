<div
    class="filament-combobox-box @if ($disabled) disabled @endif">
    <ul class="filament-combobox-list">
        <template x-for="(item, key) in {{ $target }}">
            <li>
                <a @if (!$disabled) x-on:click="toggleHighlight('{{ $target }}', key)" @endif
                    :class="{ 'highlighted': item.highlighted }" x-text="item.label"
                    @if (!$disabled) x-on:dblclick="moveItem(item, '{{ $target }}', '{{ $target === 'options' ? 'selected' : 'options' }}')" @endif
                    class="filament-combobox-item @if (!$disabled) interactive @endif">
                </a>
            </li>
        </template>
    </ul>
</div>
