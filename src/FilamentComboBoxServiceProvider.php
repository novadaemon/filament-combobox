<?php

namespace Novadaemon\FilamentCombobox;

use Filament\Support\Assets\Css;
use Filament\Support\Assets\Asset;
use Spatie\LaravelPackageTools\Package;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Assets\AlpineComponent;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentComboboxServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-combobox';

    public static string $viewNamespace = 'filament-combobox';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name);

        if (file_exists($package->basePath('/../resources/views'))) {
            $package->hasViews(static::$viewNamespace);
        }

        if (file_exists($package->basePath('/../resources/lang'))) {
            $package->hasTranslations();
        }
    }

    public function packageBooted(): void
    {
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );
    }

    protected function getAssetPackageName(): ?string
    {
        return 'novadaemon/filament-combobox';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            Css::make('styles', __DIR__ . '/../resources/dist/filament-combobox.css'),
            AlpineComponent::make('combobox', __DIR__ . '/../resources/dist/filament-combobox.js'),
        ];
    }
}
