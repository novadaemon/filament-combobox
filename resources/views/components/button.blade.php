<button type="button"
    class="filament-combobox-button @if (!$disabled) interactive @endif"
    @if ($disabled) disabled @endif x-on:click="{{ $action }}">
    <x-filament::icon icon="{{ $icon }}" />
</button>
