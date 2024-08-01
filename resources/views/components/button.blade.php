<button type="button"
    class="border border-gray-200 rounded py-1 px-2 size-8 dark:border-gray-500 @if (!$disabled) hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer @endif disabled:opacity-40"
    @if ($disabled) disabled @endif x-on:click="{{ $action }}">
    <x-filament::icon icon="{{ $icon }}" />
</button>
