var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/sorteio", () =>
{
    const int totalBolasNoVolante = 60;
    const int bolasNoSorteio = 6;

    var globo = new Random();
    var numerosDoSorteio = new HashSet<int>();

    // Continua sorteando até preencher as 6 bolas, HashSet descarta duplicatas automaticamente
    while (numerosDoSorteio.Count < bolasNoSorteio)
    {
        int bolaSorteada = globo.Next(1, totalBolasNoVolante + 1);
        numerosDoSorteio.Add(bolaSorteada);
    }

    var resultado = numerosDoSorteio.OrderBy(bola => bola).ToArray();

    return Results.Ok(new { numerosDoSorteio = resultado });
});

app.Run();
