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
    <div class="filament-combobox-container" 
        x-ignore 
        x-load
        x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('combobox', 'novadaemon/filament-combobox') }}"
        x-data="cbFormComponent({ options: @js($options), selected: @js($selected), statePath: @js($statePath),state: $wire.$entangle('{{ $statePath }}') })" wire:ignore>

        @if ($showLabels)
            <div class="filament-combobox-labels">
                <div class="filament-combobox-label-section">
                    <x-filament-combobox::box-label :label="$optionsLabel" />
                </div>
                <div class="filament-combobox-spacer"></div>
                <div class="filament-combobox-label-section">
                    <x-filament-combobox::box-label :label="$selectedLabel" />
                </div>

            </div>
        @endif
        @if ($showBoxSearchs())
            <div class="filament-combobox-search-container">
                <div class="filament-combobox-label-section">
                    <x-filament-combobox::input-search :target="'options'" :disabled="$isDisabled()" />
                </div>
                <div class="filament-combobox-spacer"></div>
                <div class="filament-combobox-label-section">
                    <x-filament-combobox::input-search :target="'selected'" :disabled="$isDisabled()" />
                </div>

            </div>
        @endif
        <div class="filament-combobox-main-container" style="height: {{ $height }}">
            <div class="filament-combobox-label-section h-full">
                <x-filament-combobox::box-items :target="'options'" :disabled="$isDisabled()" />
            </div>
            <div class="filament-combobox-options-spacer">
                <x-filament-combobox::button :icon="'heroicon-s-chevron-right'" :disabled="$isDisabled()" :action="'moveToRight'" />
                <x-filament-combobox::button :icon="'heroicon-s-chevron-double-right'" :disabled="$isDisabled()" :action="'moveToRightAll'" />
                <x-filament-combobox::button :icon="'heroicon-s-chevron-left'" :disabled="$isDisabled()" :action="'moveToLeft'" />
                <x-filament-combobox::button :icon="'heroicon-s-chevron-double-left'" :disabled="$isDisabled()" :action="'moveToLeftAll'" />
            </div>
            <div class="filament-combobox-label-section h-full">
                <x-filament-combobox::box-items :target="'selected'" :disabled="$isDisabled()" />
            </div>
        </div>

    </div>
</x-dynamic-component>
