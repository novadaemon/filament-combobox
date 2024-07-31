@php
    $options = $getOptionsForJs();
    $selected = $getState();
    $height = $getHeight();
    $showLabels = $isLabelsVisible();
    $optionsLabel = $getOptionsLabel();
    $selectedLabel = $getSelectedLabel();
    $statePath = $getStatePath();
@endphp
<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div @class(['flex', 'gap-2', 'min-h-40', $height]) x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('combobox', 'novadaemon/filament-combobox') }}"
        x-data="cbFormComponent({ options: @js($options), selected: @js($selected), wire: $wire, statePath: @js($statePath) })" wire:ignore>
        <div class="w-1/2 flex flex-col h-full">
            @if ($showLabels)
                <x-filament-combobox::box-label :label="$optionsLabel" />
            @endif
            @if ($showBoxSearchs())
                <x-filament-combobox::input-search :target="'options'" :disabled="$isDisabled()" />
            @endif
            <x-filament-combobox::box-items :target="'options'" :disabled="$isDisabled()" />
        </div>

        <div class="flex flex-col gap-1 p-2 justify-center">
            <x-filament-combobox::button :icon="'heroicon-s-chevron-right'" :disabled="$isDisabled()" :action="'moveToRight'" />
            <x-filament-combobox::button :icon="'heroicon-s-chevron-double-right'" :disabled="$isDisabled()" :action="'moveToRightAll'" />
            <x-filament-combobox::button :icon="'heroicon-s-chevron-left'" :disabled="$isDisabled()" :action="'moveToLeft'" />
            <x-filament-combobox::button :icon="'heroicon-s-chevron-double-left'" :disabled="$isDisabled()" :action="'moveToLeftAll'" />
        </div>
        <div class="w-1/2 flex flex-col h-full">
            @if ($showLabels)
                <x-filament-combobox::box-label :label="$selectedLabel" />
            @endif
            @if ($showBoxSearchs())
                <x-filament-combobox::input-search :target="'selected'" :disabled="$isDisabled()" />
            @endif
            <x-filament-combobox::box-items :target="'selected'" :disabled="$isDisabled()" />
        </div>
    </div>
</x-dynamic-component>
