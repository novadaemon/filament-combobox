<div class="filament-combobox-input-wrapper">
    <div class="filament-combobox-input-container">
        <x-filament::input placeholder="{{ __('filament-combobox::translations.input-search.placeholder') }}"
            x-on:keydown.debounce.100ms="search('{{ $target }}', $event.target.value)" :disabled="$disabled" />
    </div>
</div>
