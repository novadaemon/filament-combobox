<div
    class="fi-input-wrp flex rounded-lg shadow-sm ring-1 transition duration-75 bg-white dark:bg-white/5 [&:not(:has(.fi-ac-action:focus))]:focus-within:ring-2 ring-gray-950/10 dark:ring-white/20 [&:not(:has(.fi-ac-action:focus))]:focus-within:ring-primary-600 dark:[&:not(:has(.fi-ac-action:focus))]:focus-within:ring-primary-500 fi-fo-text-input mb-2">
    <div class="min-w-0 flex-1">
        <x-filament::input placeholder="{{ __('filament-combobox::translations.input-search.placeholder') }}"
            x-on:keydown.debounce.100ms="search('{{ $target }}', $event.target.value)" :disabled="$disabled" />
    </div>
</div>
