import graphene

from graphene_django.types import DjangoObjectType

from oakbike.models import Report


class ReportType(DjangoObjectType):
    class Meta:
        model = Report
        only_fields = (
            'id',
            'img_url',
            'date_created'
        )


class CreateReport(graphene.Mutation):
    id = graphene.UUID()
  
    class Arguments:
        img_url = graphene.String(required=False)

    def mutate(self, info, **kwargs):
        r = Report.objects.create()
        if kwargs.get('img_url'):
            r.img_url = kwargs.get('img_url')
        return CreateReport(id=r.id)


class Query(graphene.ObjectType):
    view_report = graphene.Field(ReportType, id=graphene.UUID())
    list_reports = graphene.List(ReportType)

    def resolve_view_report(self, info, **kwargs):
        report_id = kwargs.get('id', None)
        if report_id:
            return Report.objects.get(id=report_id)

    def resolve_list_reports(self, info, **kwargs):
        return Report.objects.all()


class Mutation(graphene.AbstractType):
    create_report = CreateReport.Field()
