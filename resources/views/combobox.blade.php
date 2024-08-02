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
    <div class="flex flex-col gap-2" x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('combobox', 'novadaemon/filament-combobox') }}"
        x-data="cbFormComponent({ options: @js($options), selected: @js($selected), wire: $wire, statePath: @js($statePath) })" wire:ignore>

        @if ($showLabels)
            <div class="w-full flex">
                <div class="w-1/2">
                    <x-filament-combobox::box-label :label="$optionsLabel" />
                </div>
                <div class="w-20"></div>
                <div class="w-1/2">
                    <x-filament-combobox::box-label :label="$selectedLabel" />
                </div>

            </div>
        @endif
        @if ($showBoxSearchs())
            <div class="w-full flex">
                <div class="w-1/2">
                    <x-filament-combobox::input-search :target="'options'" :disabled="$isDisabled()" />
                </div>
                <div class="w-20"></div>
                <div class="w-1/2">
                    <x-filament-combobox::input-search :target="'selected'" :disabled="$isDisabled()" />
                </div>

            </div>
        @endif
        <div class="w-full flex min-h-36" style="height: {{ $height }}">
            <div class="w-1/2 h-full">
                <x-filament-combobox::box-items :target="'options'" :disabled="$isDisabled()" />
            </div>
            <div class="w-20 flex flex-col gap-1 p-2 justify-center items-center">
                <x-filament-combobox::button :icon="'heroicon-s-chevron-right'" :disabled="$isDisabled()" :action="'moveToRight'" />
                <x-filament-combobox::button :icon="'heroicon-s-chevron-double-right'" :disabled="$isDisabled()" :action="'moveToRightAll'" />
                <x-filament-combobox::button :icon="'heroicon-s-chevron-left'" :disabled="$isDisabled()" :action="'moveToLeft'" />
                <x-filament-combobox::button :icon="'heroicon-s-chevron-double-left'" :disabled="$isDisabled()" :action="'moveToLeftAll'" />
            </div>
            <div class="w-1/2 h-full">
                <x-filament-combobox::box-items :target="'selected'" :disabled="$isDisabled()" />
            </div>
        </div>

    </div>
</x-dynamic-component>
