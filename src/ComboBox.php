<?php

namespace Novadaemon\FilamentCombobox;

use Closure;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Concerns;
use Filament\Forms\Components\Component;

class Combobox extends Select
{
    use Concerns\HasOptions;
    use Concerns\HasPivotData;

    protected bool | Closure $showLabels = true;

    protected string | Closure $optionsLabel;

    protected string | Closure $selectedLabel;

    protected bool | Closure $boxSearchs = false;

    protected string $height = '144px';

    protected string $view = 'filament-combobox::combobox';

    protected function setUp(): void
    {
        parent::setUp();

        $this->optionsLabel = __('filament-combobox::translations.labels.options');
        $this->selectedLabel = __('filament-combobox::translations.labels.selected');

        $this->registerListeners([
            'filament-combobox::updateState' => [fn (Component $component, string $statePath, array $values) => $statePath === $component->getStatePath() ? $this->updateState($values) : null],
        ]);
    }

    public function updateState(array $values): void
    {
        $values = collect($values)->pluck('value')->toArray();
        $this->state($values);
    }

    public function isMultiple(): bool
    {
        return true;
    }

    public function isSearchable(): bool
    {
        return false;
    }

    public function boxSearchs(bool | Closure $condition = true): static
    {
        $this->boxSearchs = $condition;

        return $this;
    }

    public function showBoxSearchs(): bool
    {
        return (bool) $this->evaluate($this->boxSearchs);
    }

    public function height(string | Closure $condition): static
    {
        $string = (string) $this->evaluate($condition);

        $this->height = 'h-[' . $string . ']';

        return $this;
    }

    public function showLabels(bool | Closure $condition = true): static
    {
        $this->showLabels = $condition;

        return $this;
    }

    public function isLabelsVisible(): bool
    {
        return (bool) $this->evaluate($this->showLabels);
    }

    public function getHeight(): string
    {
        return $this->height;
    }

    public function optionsLabel(string | Closure $label): static
    {
        $this->optionsLabel = $label;

        return $this;
    }

    public function getOptionsLabel(): string
    {
        return (string)$this->evaluate($this->optionsLabel);
    }

    public function selectedLabel(string | Closure $label): static
    {
        $this->selectedLabel = $label;

        return $this;
    }

    public function getSelectedLabel(): string
    {
        return (string) $this->evaluate($this->selectedLabel);
    }

}
