// Declaraciones de tipos para módulos sin tipos
declare module 'imagemin' {
  interface Plugin {
    (input: Buffer): Promise<Buffer>;
  }
  
  interface Options {
    destination?: string;
    plugins?: Plugin[];
    glob?: boolean;
  }
  
  function imagemin(input: string[] | Buffer[], options?: Options): Promise<{data: Buffer, sourcePath?: string}[]>;
  export = imagemin;
}
declare module 'imagemin-mozjpeg' {
  interface Options {
    quality?: number;
    progressive?: boolean;
    targa?: boolean;
    revert?: boolean;
    fastCrush?: boolean;
    dcScanOpt?: number;
    trellis?: boolean;
    trellisDC?: boolean;
    tune?: string;
    overshoot?: boolean;
    arithmetic?: boolean;
    dct?: string;
    quantBaseline?: boolean;
    quantTable?: number;
    smooth?: number;
    maxMemory?: number;
    sample?: string[];
  }
  
  function imageminMozjpeg(options?: Options): any;
  export = imageminMozjpeg;
}

declare module 'imagemin-pngquant' {
  interface Options {
    speed?: number;
    strip?: boolean;
    quality?: [number, number];
    dithering?: number | boolean;
    posterize?: number;
    verbose?: boolean;
  }
  
  function imageminPngquant(options?: Options): any;
  export = imageminPngquant;
}

declare module 'imagemin-webp' {
  interface Options {
    quality?: number;
    alphaQuality?: number;
    method?: number;
    size?: number;
    sns?: number;
    filter?: number;
    autoFilter?: boolean;
    sharpness?: number;
    lossless?: boolean;
    nearLossless?: number;
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    resize?: {
      width: number;
      height: number;
    };
    metadata?: string[];
  }
  
  function imageminWebp(options?: Options): any;
  export = imageminWebp;
}

declare module 'rollup-plugin-obfuscator' {
  interface ObfuscatorOptions {
    compact?: boolean;
    controlFlowFlattening?: boolean;
    deadCodeInjection?: boolean;
    stringArray?: boolean;
    rotateStringArray?: boolean;
    stringArrayThreshold?: number;
    unicodeEscapeSequence?: boolean;
    identifierNamesGenerator?: string;
    renameGlobals?: boolean;
    selfDefending?: boolean;
    splitStrings?: boolean;
    splitStringsChunkLength?: number;
    transformObjectKeys?: boolean;
  }
  
  function obfuscator(options?: ObfuscatorOptions): any;
  export = obfuscator;
}