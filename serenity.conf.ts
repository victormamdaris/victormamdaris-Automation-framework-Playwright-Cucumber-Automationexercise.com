import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver, configure } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import * as path from 'path';

configure({
  crew: [
    ArtifactArchiver.storingArtifactsAt(path.resolve(__dirname, 'target/site/serenity')),
    SerenityBDDReporter.fromJSON({}),
    ConsoleReporter.forDarkTerminals(),
  ],
});
